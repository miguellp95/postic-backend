"use strict";
const ProductModel = require("../models/product");

const controller = {};

controller.newProduct = async (req, res) => {
  let statusCode, result;

  const { nombreProducto, descripcionProducto, precioProducto, idVendedor } = req.body;

  if (nombreProducto && descripcionProducto && precioProducto) {
    const product = await ProductModel.findOne({
      nombreProducto: nombreProducto,
    });
    
    try {
      const user = await UserModel.findById(idVendedor);
 
      if (!product && user.emailVerificadoUsuario) {
        const productObj = new ProductModel({
          nombreProducto,
          descripcionProducto,
          precioProducto,
          idVendedor

        });
        user.rolUsuario = "Vendedor";
        user.save();
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
    } catch (error) {
      statusCode = 500;
      result = { message: "Server Error ", error };
    }


  } else {
    statusCode = 400;
    result = "Campos sin datos, llenar obligatorios";
  }

  res.status(statusCode).json(result);
};
controller.fetchProducts = async (req, res) => {
  let statusCode, result;
  const products = await ProductModel.find({});
  if (products.length > 0) {
    statusCode = 200;
    result = products;
    /*try {
      const user = await UserModel.findById(result.idVendedor);
      if (user) {
        result.estadoUsuario = user.estadoUsuario;
        result.emailUsuario = user.emailUsuario;
      }
    } catch (error) {
      statusCode = 500;
      result = { message: "Server Error ", error };
    }*/
  } else {
    statusCode = 400;
    result = "No hay registros";
  }
  res.status(statusCode).json(result);
};
controller.updateProduct = async (req, res) => {
  let statusCode, result;
  const { idProducto } = req.params;
  const { nombreProducto, descripcionProducto, precioProducto, estadoProducto, idVendedor } =
    req.body;
  try {
    const product = await ProductModel.findById(idProducto);
    if (product.idVendedor == idVendedor) {
      if (product) {
        if (nombreProducto) product.nombreProducto = nombreProducto;
        if (descripcionProducto)
          product.descripcionProducto = descripcionProducto;
        if (precioProducto) product.precioProducto = precioProducto;
        if (estadoProducto) product.estadoProducto = estadoProducto;

        product.save();
        statusCode = 200;
        result = "Producto actualizado exitosamente.";
      } else {
        statusCode = 400;
        result = "El producto no existe.";
      }
    } else {
      statusCode = 400;
      result = "No tiene permiso para editar este producto.";
    }
  } catch (error) {
    statusCode = 500;
    result = { message: "Server Error ", error };
  }
  res.status(statusCode).json(result);
};

controller.delete = async (req, res) => {
  let statusCode, result;
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    //if (product.idVendedor == idVendedor) {
    if (product) {
      product.remove();
      statusCode = 200;
      result = "El producto se elimino correctamente..";
    } else {
      statusCode = 400;
      result = "El producto no existe.";
    }
    /*} else {
      statusCode = 400;
      result = "No tiene permiso para eliminar este producto.";
    }*/
  } catch (error) {
    statusCode = 500;
    result = { error: "Server error", message: "El producto no existe." };
  }
  res.status(statusCode).json(result);
};

module.exports = controller;
