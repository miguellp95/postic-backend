"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    nombreProducto: { type: String },
    descripcionProducto: { type: String },
    precioProducto: { type: Number },
    estadoProducto: {
      type: String,
      enum: ["Disponible", "Agotado"],
      default: "Disponible",
    },
    idUsers: { type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producto", schema);
