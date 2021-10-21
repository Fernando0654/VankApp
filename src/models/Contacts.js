const mongoose = require('mongoose');
const { Schema } = mongoose;

const Contact = new Schema({
    belongTo: {type: String, required: true},
    emailContact: {type: String, required: true},
    nameContact: {type: String, required: true}
});

module.exports = mongoose.model('Contact', Contact);