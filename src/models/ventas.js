const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ventaSchema = new Schema({
    idVenta: { type: mongoose.Types.ObjectId },
    valorTotal: Number,
    fecha : {
        type: Date,
        default: Date.now
    },
    
    User : {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    estadoVenta: {
        type: String,
        enum: ["En Proceso", "Entregada","Cancelada"],
        default: "En Proceso",
      },
    productos : [{
        productos : {
            type: Schema.Types.ObjectId,
            ref : "Producto"
        },
        cantidad : Number
    }]
});

module.exports = mongoose.model("Venta", ventaSchema);