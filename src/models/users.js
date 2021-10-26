"use strict";

const mongoose = require("mongoose");
//var uniqueValidator = require('mongoose-unique-validator')




const schema = new mongoose.Schema( 
  {
    idUser: { type: String},
    nombreCompleto: { type: String, required: true },
    urlFotoUsuario: { type: String },
    emailUsuario: { type: String, require: true, unique:true,index:true},
    emailVerificadoUsuario: { type: Boolean , required : true},
    rolUsuario: { type: String, enum:['Administrador','Vendedor','Cliente'], default: 'Cliente'},
    estadoUsuario: { type: String, enum:['Activo', 'Inactivo'], default :'Activo' },
  },
  { timestamps: true }
);



/*var user = mongoose.model('User', schema );*/

/*user.collection.createIndex({emailUsuario:1},{partialFilterExpression:{emailUsuario:{$exists:true},unique:true}});*/
/*user.collection.dropIndex('emailUsuario_1').then(function(value) {
  console.log(value); // Success!
}, function(reason) {
  //console.log(reason); // Error!
})
*/
//schema.plugin(uniqueValidator);


//var user = mongoose.model('User', schema );
// Dropping an Index in MongoDB

process.on('unhandledRejection', (reason, p) => {
  //console.error('Unhandled Rejection at:', p, 'reason:', reason)
  //process.exit(1)
});
module.exports = mongoose.model("User", schema);
