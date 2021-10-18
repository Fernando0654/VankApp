const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    correo: {type: String, required: true},
    concepto: {type: String, required: true},
    cantidad: {type: String, required: true},
    fecha: {type: Date, default: new Date(Date.now()).toDateString()},
    user: { type: String, required: true}
})

module.exports = mongoose.model('Transaction', TransactionSchema);