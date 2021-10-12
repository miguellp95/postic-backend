"use strict";

const mongoose = require("mongoose");
const model = mongoose.model();
const Types = mongoose.Types;

const schema = new mongoose.Schema(
  {
    idProducto: { type: Types.ObjectId },
    nombreProducto: { type: String },
    descripcionProducto: { type: String },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("Producto", schema);
