const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    mobile: {
        type: Number,
        required: true,
        unique: true,
        min: 1000000000,
        max: 9999999999
    },
    name: {
        type: String,
        required: true
    }
}, {
    timeStamps: true
});

const Customer = mongoose.model('customer', Schema);

module.exports = Customer;