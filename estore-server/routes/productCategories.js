const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const productCategories = express.Router();
const pool = require("../shared/pool")




productCategories.get("/", (req, res) => {

      pool.query("SELECT * FROM categories", (error, categories) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.status(200).send(categories);
        }
      });
    
});


module.exports = productCategories;