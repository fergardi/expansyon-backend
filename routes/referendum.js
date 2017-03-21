var models = require('../models')
var express = require('express')
var router = express.Router()

var constants = require('../config/constants')
var security = require('../services/security')
var socketio = require('../services/socketio').io()
var cron = require('../services/cron')
var _ = require('lodash')
var factory = require('../factories/referendum')

// add referendum
cron.schedule('30 * * * * *', () => {
  models.Referendum.create(factory.build())
  .then((referendum) => {
    models.Referendum.findAll()
    .then((referendums) => {
      referendums = _.shuffle(referendums)
      referendums.forEach((referendum, index) => {
        referendum.visible = index < constants.senate
        referendum.save()
      })
      socketio.emit('senate')
    })
  })
})

// GET /api/referendum
router.get('/', security.secured, (req, res) => {
  models.Referendum.findAll({
    where: {
      $and: [
        { visible: true },
        { active: false }
      ]
    }
  })
  .then((referendums) => {
    res.status(200).json(referendums)
  })
})

module.exports = router
