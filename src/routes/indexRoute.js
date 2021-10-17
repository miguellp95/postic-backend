"use strict";

const router = require("express").Router();
const HomeController = require("../controller/indexController");


router.get("/", HomeController)
  


module.exports = router;
