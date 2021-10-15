"use strict";
const ProductModel = require("../models/product");

const controller = {};

controller.newProduct = async (req, res) => {
  let statusCode, result;

  const { nombreProducto, descripcionProducto, precioProducto } = req.body;

  if (nombreProducto && descripcionProducto && precioProducto) {
    const product = await ProductModel.findOne({
      nombreProducto: nombreProducto,
    });

    if (!product) {
      const productObj = new ProductModel({
        nombreProducto,
        descripcionProducto,
        precioProducto,
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
controller.fetchProducts = async (req, res) => {
  let statusCode, result;
  const products = await ProductModel.find({});
  if (products.length > 0) {
    statusCode = 200;
    result = products;

  } else {
    statusCode = 400;
    result = "No hay registros";
  }
  res.status(statusCode).json(result);


}
controller.update = async (req, res) => {
  let statusCode, result;

  const products = await ProductModel.updateOne({_id:req.params.idProducto},
        {$set:{
          nombreProducto:req.body.nombreProducto,
          descripcionProducto:req.body.descripcionProducto,
          PrecioProducto:req.body.precioProducto,
          state:req.body.state
        }},
        {multi:true,new:true})
      
        if(products) {
          statusCode=200;
          result=products;
        } else {
          statuscode=400
          result="no existe el id";
        }


  res.status(statusCode).json(result);
  
}



module.exports = controller;
