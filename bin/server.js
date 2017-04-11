#!/usr/bin/env node
var models = require('../models')

require('dotenv').config()

models.sequelize.sync({force: process.env.SEQUELIZE_SYNC || true})
.then(() => {
  if (process.env.SEQUELIZE_FIXTURES || true) {
    const fixtures = require('sequelize-fixtures')
    console.log('Loading fixtures...')
    fixtures.loadFile('./fixtures/*.*', models)
  }
})

var server = require('../app').server

server.listen(process.env.PORT || 34567, () => {
  console.log('Listening on port ' + server.address().port)
})
