"use strict";
//dependencias
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

// inicializacion de dependencias
const app = express();

// configuracion de servidor
dotenv.config();
const port = process.env.PORT || 3001;
app.set("port", port);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// routes
app.use("/", require("./routes/indexRoute"));
app.use("/api/postic", require("./routes/productRoutes"));
app.use("/api/postic", require("./routes/userRoutes"));
app.use("/api/postic", require("./routes/sellsRoutes"));
// static
app.use("/public", express.static(path.resolve("public")));

module.exports = app;
