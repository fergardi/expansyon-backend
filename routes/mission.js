var models = require('../models')
var express = require('express')
var router = express.Router()

var constants = require('../config/constants')
var security = require('../services/security')
var socketio = require('../services/socketio').io()
var cron = require('../services/cron')
var _ = require('lodash')
var factory = require('../factories/mission')

// add mission
cron.schedule('45 * * * * *', () => {
  models.Mission.create(factory.build())
  .then((mission) => {
    models.Mission.findAll()
    .then((missions) => {
      missions = _.shuffle(missions)
      missions.forEach((mission, index) => {
        mission.visible = index < constants.cantina
        mission.save()
      })
      socketio.emit('cantina')
    })
  })
})

// GET /api/mission
router.get('/', security.secured, (req, res) => {
  models.Mission.findAll({ where: { visible: true } })
  .then((missions) => {
    res.status(200).json(missions)
  })
})

module.exports = router
