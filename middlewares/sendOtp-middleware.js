const fast2sms = require('fast-two-sms');
const otplib = require('otplib');

require('dotenv').config();

const { genericError } = require('../errors/error-message');

const sendOtp = (req, res, next) => {
    try{
        const token = otplib.authenticator.generate(process.env.OTP_SECRET);
        const otpOptions = {
            authorization: process.env.FAST2SMS_API_KEY,
            message: `Your otp is ${token}`,
            numbers: [req.body.mobile]
        }

        fast2sms.sendMessage(otpOptions).then(() => {
            req.otp = token;
            next();
        });
    } catch (err) {
        genericError(err);
    }
};

module.exports = sendOtp;