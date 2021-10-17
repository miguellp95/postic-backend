"use strict";
const UserModel = require("../models/users");

const controller = {};

controller.newUser = async (req, res) => {
  let statusCode, result;

  const {
    nombresUsuario,
    apellidosUsuario,
    urlFotoUsuario,
    emailUsuario,
    rolUsuario
  } = req.body;

  if (!rolUsuario) {
    rolUsuario = "Cliente";
  }

  if (emailUsuario) {
    const user = await UserModel.findOne({ emailUsuario });

    if (!user) {
      const userObj = new UserModel({
        nombresUsuario,
        apellidosUsuario,
        urlFotoUsuario,
        emailUsuario,
        rolUsuario ,
      });

      try {
        userObj.save();
        statusCode = 200;
        result = "Usuario registrado con exito";
      } catch (error) {
        statusCode = 500;
        result = { message: "Error de serivor. Algo interno falló", error };
      }
    } else {
      statusCode = 400;
      result = "Ya existe un usuario con ese correo.";
    }
  } else {
    statusCode = 400;
    result = "Se requiere un correo electrónico.";
  }

  res.status(statusCode).json(result);
};
controller.fetchUsers = async (req, res) => {
  let statusCode, result;
  const users = await UserModel.find({});
  if (users.length > 0) {
    statusCode = 200;
    result = users;
  } else {
    statusCode = 400;
    result = "No hay registros";
  }
  res.status(statusCode).json(result);
};
controller.updateUser = async (req, res) => {
  let statusCode, result;
  const { idUser } = req.params;
  const {
    nombresUsuario,
    apellidosUsuario,
    urlFotoUsuario,
    emailUsuario,
    rolUsuario,
    estadoUsuario,
  } = req.body;
  try {
    const user = await UserModel.findById(idUser);
    if (user) {
      if (nombresUsuario) user.nombresUsuario = nombresUsuario;
      if (apellidosUsuario)
        user.apellidosUsuario = apellidosUsuario;
      if (urlFotoUsuario) user.urlFotoUsuario = urlFotoUsuario;
      if (emailUsuario) user.emailUsuario = emailUsuario;
      if (rolUsuario) user.rolUsuario = rolUsuario;
      if (estadoUsuario) user.estadoUsuario = estadoUsuario;

      user.save();
      statusCode = 200;
      result = "Usuario actualizado exitosamente.";
    } else {
      statusCode = 400;
      result = "El usuario no existe.";
    }
  } catch (error) {
    statusCode = 500;
    result = { message: "Server Error ", error };
  }
  res.status(statusCode).json(result);
};
controller.deleteUser = async (req, res) => {
  let statusCode, result;
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      user.remove();
      statusCode = 200;
      result = "El usuario se elimino correctamente..";
    } else {
      statusCode = 400;
      result = "El usuario no existe.";
    }
  } catch (error) {
    statusCode = 500;
    result = { error: "Server error", message: "El usuario no existe." };
  }
  res.status(statusCode).json(result);
};

module.exports = controller;
