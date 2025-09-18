const express = require("express");
const pool = require("../shared/pool");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

user.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try{
        const [users] = await pool.promise().query("select * from users where email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).send({message: "User does not exist."});
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).send({message: "Invalid password"});
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            "estore-secret-key",
            { expiresIn: "1h" }
        );

        res.status(200).send({
            token: token,
            expiresInSeconds: 3600,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                city: user.city,
                state: user.state,
                pin: user.pin,
            },
            message: "Login successful", })

    } catch(err) {
        console.log("Login Error: ", err);
        res.status(500).send({
            err: err.code || "INTERNAL ERROR",
            message: err.message || "Something went wrong",
        })
    }
})

module.exports = user;