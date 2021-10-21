"use strict";
const SellController = require("../controller/sellsController");

const router = require("express").Router();

router.post("/sell/new", SellController.newSell);
// router.get("/sell/list", SellController.fetchSells);
// router.put("/sell/update/:idVenta", SellController.updateSell);
// router.delete("/sell/:id", SellController.delete);


module.exports = router;
