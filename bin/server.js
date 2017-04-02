#!/usr/bin/env node
var models = require('../models')

var config = require('../config/config')

models.sequelize.sync({force: config.sync})
.then(() => {
  if (config.fixtures) {
    const fixtures = require('sequelize-fixtures')
    console.log('Loading fixtures...')
    fixtures.loadFile('./fixtures/*.*', models)
  }
})

var server = require('../app').server

server.listen(process.env.PORT || 34567, () => {
  console.log('Listening on port ' + server.address().port)
})
