"use strict";
const ProductController = require("../controller/productController");

const router = require("express").Router();

router.post("/product/new", ProductController.newProduct);

module.exports = router;
