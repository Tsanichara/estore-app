const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const productCategories = express.Router();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  multipleStatements: true,
});

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