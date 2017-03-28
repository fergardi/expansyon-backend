'use strict'

const factory = require('../factories/player')
const fixtures = require('../config/fixtures')

module.exports = factory.bulk(fixtures.players, true)
