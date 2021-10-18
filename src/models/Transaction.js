const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    correo: {type: String, required: true},
    concepto: {type: String, required: true},
    cantidad: {type: String, required: true},
    fecha: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Transaction', TransactionSchema);