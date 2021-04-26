'use strict'
module.exports = (db) => {
	const express = require('express')
	const router = express.Router()
	const repository = new (require('../repositories/rezerwacja'))(db)
	const {body, validationResult} = require("express-validator");

	router.get('/', (req, res) => {
		const lista = repository.getAllwInfo();
		res.render('rezerwacja_list', {
			lista
		});
	})
	
	router.get('/new', (req, res) => {
		res.render('rezerwacja_form');
	})

	router.get('/confirm/:id', (req, res) => {
		repository.confirm(req.params.id)
		res.redirect('/admin/rezerwacje/')
	})


	router.post("/new",
		body('termin_od').not().isEmpty(),
		body('termin_do').not().isEmpty().custom(value=>{return value => req.body.termin_do}),
		body('Klient_ID').isInt(),
		body('Samochod_ID').isInt(),
		(req, res) => {

			// Extract the validation errors from a request.
			const errors = validationResult(req);

			// Create a genre object with escaped and trimmed data.
			var rezerwacja =
				{ termin_od: req.body.termin_od,
				termin_do: req.body.termin_do,
				Klient_ID: req.body.Klient_ID,
				Samochod_ID: req.body.Samochod_ID
				};
			if (!errors.isEmpty()) {
				// There are errors. Render the form again with sanitized values/error messages.
				res.render('rezerwacja_form', { title: 'Create Rezerwacja', rezerwacja: rezerwacja, errors: errors.array()});
				return;
			}
			else {
				repository.addRez(rezerwacja.termin_od, rezerwacja.termin_do, rezerwacja.Klient_ID,rezerwacja.Samochod_ID)
				req.flash('info', 'dodano')
//				res.send('dodano')
				res.redirect("/admin/rezerwacje")
	
			}
		}) 
	router.get('/:id', (req, res) =>{
		const {id} = req.params;
		const rodzaj = repository.getbyId(id);
		res.render('rezerwacja_form', {id: id, rodzaj:rodzaj});

		
	})
	router.post("/:id",
		body('termin_od').not().isEmpty(),
		body('termin_do').not().isEmpty().isDate(),
		body('Klient_ID').isInt(),
		body('Samochod_ID').isInt(),
		(req, res) => {

			// Extract the validation errors from a request.
			const errors = validationResult(req);

			// Create a genre object with escaped and trimmed data.
			var rezerwacja =
				{ termin_od: req.body.termin_od,
				termin_do: req.body.termin_do,
				Klient_ID: req.body.Klient_ID,
				Samochod_ID: req.body.Samochod_ID
				};
			if (!errors.isEmpty()) {
				// There are errors. Render the form again with sanitized values/error messages.
				res.render('rezerwacja_form', { title: 'Create Rezerwacja', rezerwacja: rezerwacja, errors: errors.array()});
				return;
			}
			else {
				repository.modifyRez(id, rezerwacja.termin_od, rezerwacja.termin_do, rezerwacja.Klient_ID,rezerwacja.Samochod_ID)
				req.flash('info', 'zmodyfikowano'+id)
				res.redirect("/admin/rezerwacja")				
			}
	})
	router.get('/delete/:id', (req, res) =>{
		const {id} = req.params
		repository.deleteRez(id)
		res.redirect("/admin/rezerwacja")
	})

	return ['/admin/rezerwacje', router];
}
