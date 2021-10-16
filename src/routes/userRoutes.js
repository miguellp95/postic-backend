"use strict";
const UserController = require("../controller/userController");

const router = require("express").Router();

router.post("/user/new", UserController.newUser);
router.get("/user/list", UserController.fetchUsers);
router.put("/user/update/:idUser", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);


module.exports = router;
