"use strict";
//dependencias
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// inicializacion de dependencias
const app = express();

// configuracion de servidor
dotenv.config();
const port = process.env.PORT || 3001;
app.set("port", port);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", require("./routes/indexRoute"));
// static
app.use("/public", express.static(path.resolve("public")));

module.exports = app;
