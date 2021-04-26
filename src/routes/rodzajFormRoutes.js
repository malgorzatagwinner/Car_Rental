'use strict'
module.exports = (db) => {
	const express = require('express')
	const router = express.Router()
	const repository = new (require('../repositories/rodzaj'))(db)
	const {body, validationResult} = require("express-validator");

	router.get('/', (req, res) => {
		const lista = repository.getAll();
		res.render('rodzaj_list', {
			lista
		});
	})
	
	router.get('/new', (req, res) => {
		res.render('rodzaj_form');
	})

	router.post("/new",
		body('model').not().isEmpty(),
		body('marka').not().isEmpty(),
		body('miejsca').isInt().custom(value=>{return value>1}),
		body('rocznik').isInt().custom(value=>{return value<= (new Date()).getFullYear()}),
		body('cena').isInt(),
		body('zdjecie').not().isEmpty(),
		(req, res) => {

			// Extract the validation errors from a request.
			const errors = validationResult(req);

			// Create a genre object with escaped and trimmed data.
			var rodzaj =
				{ model: req.body.model,
				marka: req.body.marka,
				miejsca: req.body.miejsca,
				rocznik: req.body.rocznik,
				cena: req.body.cena,
				zdjecie: req.body.zdjecie
				};
			if (!errors.isEmpty()) {
				// There are errors. Render the form again with sanitized values/error messages.
				res.render('rodzaj_form', { title: 'Create Rodzaj', rodzaj: rodzaj, errors: errors.array()});
				return;
			}
			else {
				repository.addType(rodzaj.model, rodzaj.marka, rodzaj.miejsca, rodzaj.rocznik, rodzaj.cena, rodzaj.zdjecie)
				req.flash('info', 'dodano')
//				res.send('dodano')
				res.redirect("/admin/rodzaj")
	
			}
		}) 
	router.get('/:id', (req, res) =>{
		const {id} = req.params;
		const rodzaj = repository.getbyId(id);
		res.render('rodzaj_form', {id: id, rodzaj:rodzaj});

		
	})
	router.post("/:id",
		body('model').not().isEmpty(),
		body('marka').not().isEmpty(),
		body('miejsca').isInt().custom(value=>{return value>1}),
		body('rocznik').isInt().custom(value=>{return value<= (new Date()).getFullYear()}),
		body('cena').isInt(),
		body('zdjecie').not().isEmpty(),
		(req, res) => {
			const {id} = req.params;
			// Extract the validation errors from a request.
			const errors = validationResult(req);

			// Create a genre object with escaped and trimmed data.
			var rodzaj =
				{ model: req.body.model,
				marka: req.body.marka,
				miejsca: req.body.miejsca,
				rocznik: req.body.rocznik,
				cena: req.body.cena,
				zdjecie: req.body.zdjecie
				};
			if (!errors.isEmpty()) {
				// There are errors. Render the form again with sanitized values/error messages.
				res.render('rodzaj_form', { title: 'Create Rodzaj', rodzaj: rodzaj, errors: errors.array()});
				return;
			}
			else {
				repository.modifyType(id, rodzaj.model, rodzaj.marka, rodzaj.miejsca, rodzaj.rocznik, rodzaj.cena, rodzaj.zdjecie)
				req.flash('info', 'zmodyfikowano'+id)
				res.redirect("/admin/rodzaj")				
			}
	})
	router.get('/delete/:id', (req, res) =>{
		const {id} = req.params
		repository.deleteType(id)
		res.redirect("/admin/rodzaj")
	})

	return ['/admin/rodzaj', router];
}
