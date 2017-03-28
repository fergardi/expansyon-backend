'use strict'

const factory = require('../factories/battle')
const fixtures = require('../config/fixtures')

module.exports = factory.bulk(fixtures.battles, true)
