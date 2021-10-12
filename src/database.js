"use strict";

const mongoose = require("mongoose");
const db = {};

db.conectar = async function () {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("BD conectada desde mongo atlas");
  } catch (error) {
    console.log("Error :", error);
  }
};

module.exports = db;
