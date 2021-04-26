'use strict'
module.exports = (db) => {
	const express = require('express')
	const router = express.Router()
	const repository = new (require('../repositories/klient'))(db)
	const {body, validationResult} = require("express-validator");

	router.get('/', (req, res) => {
		const lista = repository.getAll();
		res.render('klient_list', {
			lista
		});
	})
	
	router.get('/new', (req, res) => {
		res.render('klient_form');
	})

	router.post("/new",
		body('nazwisko').not().isEmpty(),
		body('imie').not().isEmpty(),
		body('wiek').isInt().custom(value=>{return value>17}),
		body('mail').not().isEmpty(),
		body('prawo_jazdy').not().isEmpty(),
		(req, res) => {

			// Extract the validation errors from a request.
			const errors = validationResult(req);

			// Create a genre object with escaped and trimmed data.
			var klient =
				{ nazwisko: req.body.nazwisko,
				imie: req.body.imie,
				wiek: req.body.wiek,
				mail: req.body.mail,
				prawo_jazdy: req.body.prawo_jazdy
				};
			if (!errors.isEmpty()) {
				// There are errors. Render the form again with sanitized values/error messages.
				res.render('klient_form', { title: 'Create Klient', klient: klient, errors: errors.array()});
				return;
			}
			else {
				repository.addKlient(klient.nazwisko, klient.imie, klient.wiek, klient.mail, klient.prawo_jazdy, klient.haslo)
				req.flash('info', 'dodano')
//				res.send('dodano')
				res.redirect("/klient")
	
			}
		}) 
	router.get('/:id', (req, res) =>{
		const {id} = req.params;
		const klient = repository.getbyId(id);
		res.render('klient_form', {id: id, klient: klient});

		
	})
	router.post("/:id",
		body('nazwisko').not().isEmpty(),
		body('imie').not().isEmpty(),
		body('wiek').isInt().custom(value=>{return value>17}),
		body('mail').not().isEmpty(),
		body('prawo_jazdy').not().isEmpty(),
		body('haslo').not().isEmpty(),
		(req, res) => {
			const {id} = req.params;
			// Extract the validation errors from a request.
			const errors = validationResult(req);

			// Create a genre object with escaped and trimmed data.
			var klient =
				{ nazwisko: req.body.nazwisko,
				imie: req.body.imie,
				wiek: req.body.wiek,
				mail: req.body.mail,
				prawo_jazdy: req.body.prawo_jazdy,
				haslo: req.body.haslo
				};
			if (!errors.isEmpty()) {
				// There are errors. Render the form again with sanitized values/error messages.
				res.render('klient_form', { title: 'Create Klient', klient: klient, errors: errors.array()});
				return;
			}
			else {
				repository.modifyKlient(id, klient.nazwisko, klient.imie, klient.wiek, klient.mail, klient.prawo_jazdy, klient.haslo)
				req.flash('info', 'zmodyfikowano'+id)
				res.redirect("/klient")				
			}
	})
	router.get('/delete/:id', (req, res) =>{
		const {id} = req.params
		repository.deleteKlient(id)
		res.redirect("/klient")
	})

return ['/admin/klient', router];
}
