"use strict";
const ProductController = require("../controller/productController");

const router = require("express").Router();

router.post("/product/new", ProductController.newProduct);

router.get("/product/list", ProductController.fetchProducts);
router.put("/product/update/:idProducto", ProductController.updateProduct);

router.delete("/product/:id", ProductController.delete);


module.exports = router;
