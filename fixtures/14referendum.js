'use strict'

const factory = require('../factories/referendum')
const fixtures = require('../config/fixtures')

module.exports = factory.bulk(fixtures.referendums, true)
