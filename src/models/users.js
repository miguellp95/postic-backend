"use strict";

const mongoose = require("mongoose");
const model = mongoose.model();
const Types = mongoose.Types;

const schema = new mongoose.Schema(
  {
    idUser: { type: Types.ObjectId },
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

module.exports = model("User", schema);
