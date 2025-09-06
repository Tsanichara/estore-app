const express = require("express");
const cors = require('cors');
const productCategories = require("./routes/productCategories");
const products = require("./routes/products")
const user = require('./routes/users');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

app.use("/productCategories", productCategories);
app.use("/products", products);
app.use("/users", user);

const server = app.listen(PORT, () => {
  console.log("App is running on the port - 5001");
});
