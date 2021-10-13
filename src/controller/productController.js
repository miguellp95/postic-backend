"use strict";
const ProductModel = require("../models/product");

const controller = {};

controller.newProduct = async (req, res) => {
  let statusCode, result;
  const data = req.body;
  // const { idProducto,nombreProducto, descripcionProducto, state} = req.body;
  if (data.nombreProducto && data.descripcionProducto && data.precioProducto) {
    const product = await ProductModel.findOne({
      nombreProducto: data.nombreProducto,
    });
    if (!product) {
      const productObj = new ProductModel({
        nombreProducto: data.nombreProducto,
        descripcionProducto: data.descripcionProducto,
        precioProducto: data.precioProducto,
      });

      try {
        productObj.save();
        statusCode = 200;
        result = "Producto registrado con exito";
      } catch (error) {
        statusCode = 500;
        result = { message: "Error de serivor. Algo interno falló", error };
      }
    } else {
      statusCode = 400;
      result = "Ya existe un producto con ese nombre";
    }
  } else {
    statusCode = 400;
    result = "Campos sin datos, llenar obligatorios";
  }

  res.status(statusCode).json(result);
};

module.exports = controller;
