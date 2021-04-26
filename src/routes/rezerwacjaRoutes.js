'use strict'
module.exports = (db) => {
const express = require('express')
const router = express.Router()
const repository = new (require('../repositories/rezerwacja'))(db)


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
router.get('/:id(\\d+)', (req, res) => {
        const { id } = req.params;
        const rows = repository.getbyClient(id);
        res.json({
            "message":"success",
            "data":rows
        })
})
router.post("/new", (req, res) => {
	const rezerwacja = req.body;
	console.log(rezerwacja)
	const id = repository.addType(rezerwacja.termin_od, rezerwacja.termin_do, rezerwacja.Klient_ID,rezerwacja.Samochod_ID)

	res.json({
            "message":"success",
            "id": id
        })
}) 
return ['/api/rezerwacja', router];
}
