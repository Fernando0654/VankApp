const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    correo: {type: String, required: true},
    concepto: {type: String, required: true},
    cantidad: {type: String, required: true},
    fecha: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    user: { type: String, required: true},
    tipo: {type: String, required: true}
})

module.exports = mongoose.model('Transaction', TransactionSchema);
