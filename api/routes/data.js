const db = require("../database/db")
const express = require("express");
const querys = require("../database/querys")
const token = require("../middleware/token")
const router = express.Router();

//this file contains the CRUD REST API

//Read data
router.get("/", token.checkToken, (req, res) => {
    db.all(querys.getData, (err, rows) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json(rows)
        }
    })
});

//Read data
router.get("/:usrid", token.checkToken, (req, res) => {
    const usrid = parseInt(req.params.usrid)

    db.all(querys.getDataByUsrid, [usrid], (err, rows) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json(rows)
        }
    })
});

//Insert data
router.post("/", token.checkToken, (req, res) => {
    const { usrid, car, type, ps } = req.body

    db.run(querys.createData, [usrid, car, type, ps], function (err) {
        if (err) {
            console.log(err)
        }
        else {
            res.status(201).send(`A row has been inserted with rowid ${this.lastID}`);
        }
    })
});

//Update data
router.put("/:id", token.checkToken, (req, res) => {
    const id = parseInt(req.params.id)
    const { car, type, ps } = req.body

    db.run(querys.updateData, [car, type, ps, id], (err, results) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).send(`Data modified with ID: ${id}`);
        }
    })
});

//Delete data
router.delete("/:id", token.checkToken, (req, res) => {

    const id = parseInt(req.params.id)

    db.run(querys.deleteDataById, [id], (err, results) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).send(`Data deleted with ID: ${id}`);
        }
    })
});

//Delete data
router.delete("/", token.checkToken, (req, res) => {

    db.run(querys.deleteData, (err, results) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).send(`Data deleted`);
        }
    })
});

//Reset sequence (if you delete all data in table "data" you need to reset the primary keys, to keep things consistent)
router.delete("/del/seq", token.checkToken, (req, res) => {

    db.run(querys.deleteDataSequence, (err, results) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).send(`Data sequence reset`);
        }
    })
});

module.exports = router