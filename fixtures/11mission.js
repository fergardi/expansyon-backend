'use strict'

const factory = require('../factories/mission')
const fixtures = require('../config/fixtures')

module.exports = factory.bulk(fixtures.missions, true)
