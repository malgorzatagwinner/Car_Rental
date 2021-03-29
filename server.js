const path = require('path')
const bodyParser = require("body-parser");
const express = require('express')
const app = express()
const port = 8000
const db = require("./src/database.js")
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//app.use(express.static(path.join(__dirname, 'public')))

//const routes_sam = require('./src/routes/samochodRoutes.js')(db)
//const routes_rez = require('./src/routes/rezerwacjaRoutes.js')(db)
//app.use('/samochody', routes_sam)

const glob = require('glob');
glob.sync('./src/routes/*.js').forEach((file) => {
	console.log(file);
	const routes_sam = require(file)(db);
	app.use(routes_sam[0], routes_sam[1])
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	console.log(req.path)
	var err = new Error('Not Found')
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

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
var session = require("express-session"),
    bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


