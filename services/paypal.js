var Paypal = require('paypal-express-checkout')
var config = require('../config/config')

var paypal = Paypal.init(config.paypal.username, config.paypal.password, config.paypal.signature, config.paypal.return, config.paypal.cancel, config.paypal.debug)

module.exports = paypal
