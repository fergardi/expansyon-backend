#!/usr/bin/env node
require('dotenv').config()
var models = require('../models')

models.sequelize.sync({force: process.env.DB_FORCE})
.then(() => {
  if (process.env.DB_FIXTURES) {
    const fixtures = require('sequelize-fixtures')
    console.log('Loading fixtures...')
    fixtures.loadFile('./fixtures/*.*', models)
  }
})

var server = require('../app').server

server.listen(process.env.PORT, () => {
  console.log('Listening on port ' + server.address().port)
})
