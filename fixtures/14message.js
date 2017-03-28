'use strict'

const factory = require('../factories/message')
const fixtures = require('../config/fixtures')

module.exports = factory.bulk(fixtures.messages, true)
