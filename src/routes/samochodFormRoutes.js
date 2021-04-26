'use strict'
module.exports = (db) => {
        const express = require('express')
        const router = express.Router()
        const repository = new (require('../repositories/samochod'))(db)
        const rodzaj_rep = new (require('../repositories/rodzaj'))(db)
        const {body, validationResult} = require("express-validator");

	router.get('/new', (req, res) => {
		var rodzaje =  rodzaj_rep.getAll()
		res.render('samochod_form', {rodzaje});
	})
	
	router.post('/new',
		body('rejestracja').not().isEmpty(),
		body('rodzaj_id').isInt(),
		body('kolor').not().isEmpty(),
		(req, res) => {
			const errors = validationResult(req)
			var rodzaje =  rodzaj_rep.getAll()
			var samochod = {
				rejestracja: req.body.rejestracja,
				rodzaj_id: req.body.rodzaj_id,
				kolor: req.body.kolor
			};
			if(!errors.isEmpty()){
				res.render('samochod_form', {title: 'Create Samochod', samochod: samochod, errors: errors.array(), rodzaje});
				return;
			}
			else{
				repository.addCar(samochod.rejestracja, samochod.rodzaj_id, samochod.kolor)
				//res.send('dodano samochod')
				res.redirect("/admin/samochod")
				
			}
		})
	router.get('/:id', (req, res) =>{
		const {id} = req.params;
		const samochod = repository.getbyId(id);
		var rodzaje =  rodzaj_rep.getAll()
		res.render('samochod_form', {id: id, rodzaje: rodzaje, samochod: samochod});
	})
	router.post('/:id',
		body('rejestracja').not().isEmpty(),
		body('rodzaj').isInt(),
		(req, res) => {
			const {id} = req.params;
			const errors = validationResult(req)

			var samochod = {
				rejestracja: req.body.rejestracja,
				rodzaj: req.body.rodzaj,
				kolor: req.body.kolor
			};
			if(!errors.isEmpty()){
				res.render('samochod_form', {title: 'Create Samochod', samochod: samochod, errors: errors.array()});
				return;
			}
			else{
				repository.modifyCar(id, samochod.rejestracja, samochod.rodzaj, samochod.kolor)
				//res.send('zmodyfikowano'+id)
				res.redirect("/admin/samochod")
			}
	})
	router.get('/delete/:id', (req, res) =>{
		const {id} = req.params;	
		repository.deleteCar(id)
//		res.send('usunieto'+id)
		res.redirect("/admin/samochod")
	})
	router.get('/', (req, res) =>{
		const lista = repository.getAll();
                res.render('samochod_list', {
                        lista
                });

	})
		return ['/admin/samochod', router];
}
