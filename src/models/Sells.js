"use strict";

const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ventaSchema = new Schema({
  idVenta: { type: mongoose.Types.ObjectId },
  valorTotalVenta: { type: Number, required: true },
  fechaVenta: {
    type: Date,
    default: Date.now,
  },
  vendedorVenta: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  idClienteVenta: { type: String, required: true },
  nombreClienteVenta: { type: String, required: true },
  productos: [
    {
      idProducto: {
        type: Schema.Types.ObjectId,
        ref: "Producto",
      },
      cantidadProducto: { type: Number, required: true },
    },
  ],
  estadoVenta: {
    type: String,
    enum: ["Pendiente", "Cobrado", "Anulado"],
    default: "Pendiente",
  }
});

module.exports = mongoose.model("Venta", ventaSchema);
