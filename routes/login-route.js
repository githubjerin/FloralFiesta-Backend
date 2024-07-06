const router = require('express').Router();
const fast2sms = require('fast-two-sms');
const otplib = require('otplib');

const { genericError } = require('../errors/error-message');
const sendOtp = require('../middlewares/sendOtp-middleware');
const Customer = require('../models/customer-model');
const Otp = require('../models/otp-model');

require('dotenv').config();

router.post('/login', async (req, res) => {
    try{
        console.log(req.body);
        const otp = await Otp.findOne({ mobile: req.body.mobile });

        if(otp) {
            res.send('Otp already sent');
        } else {
            const token = otplib.authenticator.generate(process.env.OTP_SECRET);
            const otpOptions = {
                authorization: process.env.FAST2SMS_API_KEY,
                message: `Your otp is ${token}`,
                numbers: [req.body.mobile]
            }

            fast2sms.sendMessage(otpOptions).then(async () => {
                const newOtp = await Otp.create({
                    mobile: req.body.mobile,
                    otp: token
                });
                newOtp.save().then(() => {
                    res.send('Otp sent successfully');
                });
            });
        }
    } catch (err) {
        genericError(err);
    }
});

module.exports = router;