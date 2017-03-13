'use strict'

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var constants = require('../config/constants')
var sequelize = new Sequelize(constants.database.dbname, constants.database.username, constants.database.password, constants.database)
var db = {}

fs
.readdirSync(__dirname)
.filter(function(file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js')
})
.forEach(function(file) {
  var model = sequelize.import(path.join(__dirname, file))
  db[model.name] = model
})

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
