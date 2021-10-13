"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    idUser: { type: mongoose.Types.ObjectId },
    firstNameUser: { type: String, required: true },
    lastnameUser: { type: String, required: true },
    urlPictureUser: { type: String },
    emailUser: { type: String, required: true },
    emailVerificado: true,
    rol: { type: String, required: true, default: "cliente" },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
