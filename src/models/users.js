"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    idUser: { type: mongoose.Types.ObjectId },
    nombresUsuario: { type: String, required: true },
    apellidosUsuario: { type: String, required: true },
    urlFotoUsuario: { type: String },
    emailUsuario: { type: String, required: true },
    rolUsuario: { type: String, enum:['Administrador','Vendedor','Cliente'], default: 'Cliente'},
    estadoUsuario: { type: String, enum:['Activo', 'Inactivo'], default :'Activo' },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
