const path = require('path')
const bodyParser = require("body-parser");
const express = require('express')
const app = express()
const port = 8000
const db = require("./src/database.js")
const klient_repo = new (require("./src/repositories/klient"))(db)
const session = require('express-session')
const moment = require('moment')
const {authenticatedOnly, adminOnly} = require("./doorman")

app.use(session({ secret: "cats" }));

var passport = require('passport')
  , Strategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.set('view engine', 'pug');
app.use(session()); // session middleware
app.use(require('flash')());
app.use(express.static(path.join(__dirname, 'public')))
const {body, validationResult} = require("express-validator");

passport.use(new Strategy({
	usernameField:"mail", passwordField:"haslo"
},
  function(mail, password, cb) {
    const user = klient_repo.getbyMail(mail);
    
    if (!user) {
    	return cb(null, false);
    }
    if (user.haslo != password) {
    	return cb(null, false);
    }
    
    return cb(null, user);
}));

passport.serializeUser(function(user, cb) {
console.log("Serialize" +user)
  cb(null, user.idKlient);
});

passport.deserializeUser(function(id, cb) {
  const user = klient_repo.getbyId(id);
    if (!user) { return cb(null, false); }
    cb(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) =>{
	res.locals.user = req.user;
	next();
}
)

app.get("/login", (req, res) => {
	res.render('login')
})

app.post('/login', (req, res, next) => passport.authenticate('local', (err, user) => {
	console.log('here')
	if(err){
		console.log(err)
		return next(err)
	}
	if(!user){
		console.log(user)
		return res.render('login',{mail: req.body.mail})
	}
	req.login(user, (err2) => {
		if(err2){
			return next(err2);
		}
		res.redirect('/');
		});
})(req, res, next)
);
/*app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
*/
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });
  
app.post("/register",
	body("imie").not().isEmpty(),
	body("nazwisko").not().isEmpty(),
	body("data_ur").not().isEmpty().custom((value, {req})=>
	{if (moment().subtract(18, 'years').isSameOrBefore(value)){
		throw new Error("Aby się zarejestrować, trzeba mieć skończone 18 lat");
	}
	return true}
	),
	body("prawo_jazdy").not().isEmpty(),
	body("mail").not().isEmpty(),
	body("haslo").not().isEmpty(), 
	(req, res, next) =>{
	
	const errors = validationResult(req)
	
	if(!errors.isEmpty()){
		res.render('register', {dane: req.body, errors:errors.mapped()});
		return;
	}
	else{

		const klient_id = klient_repo.addKlient( req.body.nazwisko, req.body.imie, req.body.wiek, req.body.mail, req.body.prawo_jazdy, req.body.haslo)
		const klient = klient_repo.getbyId(klient_id)
		req.login(klient, (err) => {
		  if (err) return next(err);
		  return res.redirect('/');
		});
	}
})
//const routes_sam = require('./src/routes/samochodRoutes.js')(db)
//const routes_rez = require('./src/routes/rezerwacjaRoutes.js')(db)
//app.use('/samochody', routes_sam)

app.use('/admin/', adminOnly);


const glob = require('glob');
glob.sync('./src/routes/*.js').forEach((file) => {
	const routes_sam = require(file)(db);
	console.log(routes_sam[0]+' => ' + file);
	app.use(routes_sam[0], routes_sam[1])
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
	console.log(req.path)
	var err = new Error('404 Not Found')
	err.status = 404
	// res.redirect('/404')
	next(err)
})

app.use((err, req, res, next)=>{
	if (res.headerSend || err.status){
		return next(err)
	}
	res.status(400)
	res.json({
		"message": "error",
		"error": err.message
	})
	
}) 

app.listen(port, () => console.log(`Example app listening on http://127.0.0.1:${port}/`))



