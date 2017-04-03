'use strict'

const factory = require('../factories/guild')
const fixtures = require('../config/fixtures')

module.exports = factory.bulk(fixtures.guilds, true)
