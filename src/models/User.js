const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const User = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: String, required: true},
    phone: {type: String, required: true},
    saldo: {type: Number, required: true},
    numero: {type: String, required: true},
    expira: {type: String, required: true},
    address: {type: String, required: true},
    cvv: {type: String, required: true},
    tipo: {type: String, required: true}
});

User.methods.encryptPassword = async (password) => {
    const encrypted = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, encrypted);
    return hash;
}

User.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', User);