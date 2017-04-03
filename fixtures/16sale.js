'use strict'

const factory = require('../factories/sale')
const fixtures = require('../config/fixtures')

module.exports = factory.bulk(fixtures.sales, true)
