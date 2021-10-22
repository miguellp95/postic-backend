'use strict'

const SellModel = require('../models/Sells');

const controller = {};

controller.newSell = async (req, res) => {
  let statusCode , result;

  const { valorVenta, vendedorVenta, idClienteVenta, nombreClienteVenta, productos, estadoVenta } = req.body;

  if(valorVenta > 0 && vendedorVenta && idClienteVenta && nombreClienteVenta & productos.lenght > 0){

    const objProducts = [{
      idProducto, cantidadProducto    }]

    productos.map( producto => {
      objProducts.push({
        idProducto: producto.idProducto , cantidadProducto : producto.cantidadProducto
      })
    });
  
    const objSell= new SellModel({
      valorVenta, vendedorVenta, idClienteVenta, nombreClienteVenta, objProducts , estadoVenta
    });

    try {
      objSell.save();
      statusCode = 200;
      result = "La venta se realizó correctamente.";
    } catch (error) {
      statusCode = 500;
      result = { message : "Error Server" , error}
    }

  }else{
    statusCode = 400;
    result = "Debe llenar los campos obligatorios."
  }
  res.status(statusCode).json(result);
}

module.exports = controller;