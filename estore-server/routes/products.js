const express = require("express");
const products = express.Router();
const pool = require("../shared/pool");

products.get("/", (req, res) => {
    pool.query('SELECT * FROM PRODUCTS', (error, products) => {
        if (error){
            res.status(500).send(error);
        } else {
            res.status(200).send(products);
        }

    })
})


products.get("/:id", (req, res) => {
    let id = req.params.id;
    pool.query("SELECT * FROM PRODUCTS WHERE id = ?", [id], (error, products) => {
       if (error){
            res.status(500).send(error);
        } else {
            res.status(200).send(products);
        }
    })
})

module.exports = products;