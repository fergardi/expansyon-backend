require('dotenv').config()
var Paypal = require('paypal-express-checkout')

var paypal = Paypal.init(process.env.PAYPAL_USERNAME, process.env.PAYPAL_PASSWORD, process.env.PAYPAL_SIGNATURE, process.env.PAYPAL_RETURN, process.env.PAYPAL_CANCEL, process.env.PAYPAL_DEBUG)

module.exports = paypal
