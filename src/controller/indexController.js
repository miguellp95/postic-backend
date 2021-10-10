"use strict";

const home = function (req, res) {
  let statusCode, result;
  statusCode = 200;
  result = { message: "Bienvenido al backend de postic" };
  res.status(statusCode).json(result);
};

module.exports = home;
