'use strict'
module.exports = (db) => {
const express = require('express')
const router = express.Router()
const repository = new (require('../repositories/samochod'))(db)
const rez_repo = new (require('../repositories/rezerwacja'))(db)
const klient_repo = new (require('../repositories/klient'))(db)
const {authenticatedOnly, adminOnly} = require("../../doorman")

const {body, validationResult} = require("express-validator");

router.get('/', (req, res) => {
	res.render('view');
})

router.post("/", authenticatedOnly, 
	body('data_od').not().isEmpty(), 
	body('czas_od').not().isEmpty().custom((value, {req})=>{
	const _od = new Date(req.body.data_od +' '+req.body.czas_od);
	if(_od <= Date.now()){
	  throw new Error("Zła wartość");
	}
	return true
	}),
	body('data_do').not().isEmpty().custom((value, {req})=>
	{if(value < req.body.data_od){
		throw new Error("'Data do' nie może być wcześniejsza niż 'Data od'!");
	}
	return true}
	),
	
	body('czas_do').not().isEmpty().custom((value, {req}) =>
	{ const _od = new Date(req.body.data_od +' '+req.body.czas_od);
	  const _do = new Date(req.body.data_do +' '+req.body.czas_do);
	  if(_do <= _od ){
	  	throw new Error("Czas wypożyczenia musi być większy!");
	  }
	  return true
	}),
	(req, res) => {
	
	const errors = validationResult(req)
	const samochody = repository.getbyDate( req.body.data_od+req.body.czas_od, req.body.data_do+req.body.czas_do)
	
	if(!errors.isEmpty()){
		res.render('view', {dane: req.body, errors:errors.mapped()});
		return;
	}
	else{
		res.render('searched', {dane: req.body, samochody});	
	}
})
	
router.get("/closeup/:from/:to/:id", authenticatedOnly, (req, res) => {
	const auto = repository.getwithType(req.params.id, req.params.from, req.params.to);
	res.render('closeup', {auto, from: req.params.from, to: req.params.to});
})	
router.get("/moje/:from/:to/:id", authenticatedOnly, (req, res) => {
	const rez = rez_repo.addRez(req.params.from, req.params.to, req.user.idKlient, req.params.id)
	res.redirect('/moje_rezerwacje/');
})

router.get("/moje_rezerwacje/", authenticatedOnly, (req, res) => {
	const rez = rez_repo.getAllbyClient(req.user.idKlient);
	res.render('moje', {rezerwacje: rez})
})

router.get("/moje_rezerwacje/delete/:id", authenticatedOnly, (req, res) => {
	const rez = rez_repo.deleteRez(req.params.id)
	res.redirect('/moje_rezerwacje/');
})

router.get("/moje_rezerwacje/:id", authenticatedOnly, (req, res) =>{ 
	res.render('moje', {id: req.params.id})
})

router.get("/moje_konto/", authenticatedOnly, (req, res) =>{ 
	res.render('konto')
})

router.get("/moje_konto/delete/", authenticatedOnly, (req, res) =>{
	const id = klient_repo.deleteKlient(req.user.idKlient);
	req.logout();
	res.redirect('/');
})

router.get("/register", (req, res) => {
	res.render('register')
})

return ['/', router];
}
