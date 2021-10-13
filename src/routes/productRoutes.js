"use strict";
const ProductController = require("../controller/productController");

const router = require("express").Router();

router.post("/product/new", ProductController.newProduct);
router.get("/product/list", ProductController.fetchProducts);

module.exports = router;
