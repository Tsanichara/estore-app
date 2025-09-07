const express = require("express");
const pool = require("../shared/pool");
const bcrypt = require("bcryptjs");

const user = express.Router();

user.post("/signup", async (req, res) => {
    const {firstName, lastName, address, city, state, pin, email, password} = req.body;

    try {
        const [existingUser] = await pool.promise().query(
            'select count(*) as count from users where email = ?', [email]
        )

        if(existingUser[0].count > 0){
            return res.status(200).send({message: 'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.promise().query(
            `insert into users (email, firstname, lastname, address, city, state, pin, password) 
            values (?, ?, ?, ?, ?, ?, ?, ?)`, [email, firstName, lastName, address, city, state, pin, hashedPassword]
        )

       res.status(201).send({message: "Success"}); 
    } catch(error){
        console.log("Signup Error: ", error)
        res.status(500).send({error: error.code || "INTERNAL_ERROR" || "Something went wrong"});
    }

})

module.exports = user;