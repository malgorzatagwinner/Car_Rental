'use strict'
module.exports = (db) => {
const express = require('express')
const router = express.Router()
const repository = new (require('../repositories/samochod'))(db)


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
	const nowy_s = req.body;
	const id = repository.addCar( nowy_s.rejestracja, nowy_s.type, kolor)

	res.json({
            "message":"success",
            "id": id
        })
})

return ['/api/samochod', router];
}
