'use strict'
module.exports = (db) => {
const express = require('express')
const router = express.Router()
const repository = new (require('../repositories/rodzaj'))(db)


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
	const nowy_r = req.body;
	repository.addType(nowy_r.model, nowy_r.marka, nowy_r.miejsca, nowy_r.rocznik, nowy_r.cena)
}) 
return ['/rodzaj', router];
}
