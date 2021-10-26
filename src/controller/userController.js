const { firebase } = require('firebase/app');

"use strict";
var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccount.json");

const UserModel = require("../models/users");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://postic-607ec-default-rtdb.firebaseio.com"
});



const controller = {};
//var mongoose = require('mongoose');

controller.newUser = async (req, res) => {
  let statusCode, result;
  let {
    idUser,
    nombreCompleto,
    urlFotoUsuario,
    emailUsuario,
    emailVerificadoUsuario,
    rolUsuario,
    estadoUsuario,

  } = req.body;
  if (!rolUsuario) {
    rolUsuario = "Cliente";
  }

  if (emailUsuario) {
    const user = await UserModel.findOne({ emailUsuario });

    if (!user) {
      const userObj = new UserModel({
        idUser,
        nombreCompleto,
        urlFotoUsuario,
        emailUsuario,
        emailVerificadoUsuario,
        rolUsuario,
        estadoUsuario,
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
    result = "se requiere un correo";

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
    nombreCompleto,
    urlFotoUsuario,
    rolUsuario,
    estadoUsuario,
  } = req.body;
  try {
    const user = await UserModel.findOne({ idUser });
    if (user) {
      if (nombreCompleto) user.nombreCompleto = nombreCompleto;
      if (urlFotoUsuario) user.urlFotoUsuario = urlFotoUsuario;
      if (rolUsuario) user.rolUsuario = rolUsuario;
      if (estadoUsuario) user.estadoUsuario = estadoUsuario;
      admin
        .auth()
        .updateUser(idUser, {

          displayName: user.nombreCompleto,
          photoURL: user.urlFotoUsuario,
          disabled: estadoUsuario==="Inactivo" ?true:false,
        })
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully updated user', userRecord.toJSON());
        })
        .catch((error) => {
          console.log('Error updating user:', error);
        });
        //reload
      if (firebase.auth().currentUser) {
        firebase.auth().currentUser.reload().then(() => {
          firebase.auth().currentUser.getIdToken(true);
          //console.log(JSON.stringify(firebase.auth().currentUser));
        });
      } else {
        console.log('No authenticated user');
      }
    //reload
      //admin.auth().currentUser.reload();
  //admin.auth().currentUser.getIdToken(true)

 
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

controller.updateUserFirebase = async (req, res) => {
  let statusCode, result;
  const { emailUsuario } = req.params;
  const {
    nombreCompleto,
    urlFotoUsuario,
    emailVerificadoUsuario,
    rolUsuario,
    estadoUsuario,
  } = req.body;
  try {
    const user = await UserModel.findOne({ emailUsuario });
    if (user) {
      if (emailVerificadoUsuario) user.emailVerificadoUsuario = emailVerificadoUsuario;
      if (nombreCompleto) user.nombreCompleto = nombreCompleto;
      if (urlFotoUsuario) user.urlFotoUsuario = urlFotoUsuario;
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
