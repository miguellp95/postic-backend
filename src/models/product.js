"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    idProducto: { type: mongoose.Types.ObjectId },
    nombreProducto: { type: String },
    descripcionProducto: { type: String },
    precioProducto: { type: Number },
    estadoProducto: {
      type: String,
      enum: ["Disponible", "Agotado"],
      default: "Disponible",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producto", schema);
