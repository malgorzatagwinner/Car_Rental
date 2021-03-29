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

return ['/rezerwacja', router];
}
