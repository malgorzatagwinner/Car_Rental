'use strict'
module.exports = (db) => {
const express = require('express')
const router = express.Router()
const repository = new (require('../repositories/klient'))(db)


router.get('/', (req, res) => {
	const rows = repository.getAll();
        res.json({
            "message":"success",
            "data":rows
        })
})

router.get('/:id(\\d+)', (req, res) => {
	const { id } = req.params;
	const rows = repository.getbyId(id);
	res.json({
            "message":"success",
            "data":rows
        })
})

router.post("/new", (req, res) => {
	const klient = req.body;
	console.log(klient)
	const id = repository.addType(klient.nazwisko, klient.imie, klient.wiek, klient.mail,  klient.prawo_jazdy, klient.haslo)

	res.json({
            "message":"success",
            "id": id
        })
}) 
return ['/api/klient', router];
}
