'use strict'

require('dotenv').config()
var fs = require('fs')
var path = require('path')
const logger = require('../services/logger')
var Sequelize = require('sequelize')
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
  port: process.env.DB_PORT,
  logging: (sql) => {
    logger.info(`[${new Date()}] ${sql}`)
  }
})
var db = {}

fs
.readdirSync(__dirname)
.filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== 'index.js')
})
.forEach((file) => {
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
