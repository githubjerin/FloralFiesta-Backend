const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    mobile: {
        type: Number,
        required: true,
        unique: true,
        min: 1000000000,
        max: 9999999999
    },
    otp: {
        type: Number,
        required: true
    }
}, {
    timeStamps: true
});

const Otp = mongoose.model('otp', Schema);

module.exports = Otp;