var Paypal = require('paypal-express-checkout')
var constants = require('../config/constants')

var paypal = Paypal.init(constants.paypal.username, constants.paypal.password, constants.paypal.signature, constants.paypal.return, constants.paypal.cancel, constants.paypal.debug)

module.exports = paypal
