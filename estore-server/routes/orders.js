const express = require("express");
const pool = require("../shared/pool");
const orders = express.Router();
const checkToken = require("../shared/checkToken");

orders.post("/add", checkToken, async (req, res) => {
    const {
        userName,
        userEmail,
        address,
        city,
        state,
        pin,
        total,
        orderDetails
    } = req.body;

    try {
        //Get user ID
        const [users] = await pool.promise().query("select id from users where email = ?", [userEmail]);

        if (users.length === 0){
            return res.status(400).json({message: "User does not exist."})
        }

        const userId = users[0].id;

        //Insert order
        const [orderResult] = await pool.promise().query(`insert into orders (userId, userName, address, city,
             state, pin, total) values (?, ?, ?, ?, ?, ?, ?)`, [userId, userName, address, city, state, pin, total]);

        const orderId = orderResult.insertId;
            
        //Insert order details
        const insertPromises = orderDetails.map((item) => 
        pool.promise().query(`insert into orderdetails (orderId, productId, qty, price, amount) values (?, ?, ?, ?, ?)`,
             [orderId, item.productId, item.qty, item.price, item.amount]
        )
        );

        await Promise.all(insertPromises);

        res.status(201).json({message: "Order placed successfully."})
    } catch (error) {
        console.log("Order placement error: ", error);
        res.status(500).json({
            error: error.code || "INTERNAL_ERROR",
            message: error.message || "Something went wrong.",
        });
    }
});


module.exports = orders;