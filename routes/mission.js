var models = require('../models')
var express = require('express')
var router = express.Router()

const constants = require('../config/constants')
var security = require('../services/security')
var socketio = require('../services/socketio').io()
var cron = require('../services/cron')
var _ = require('lodash')
var factory = require('../factories/mission')

// add mission
cron.schedule('0 30 * * * *', () => {
  models.Mission.create(factory.build())
  .then((mission) => {
    models.Mission.findAll()
    .then((missions) => {
      if (missions.length > 0) {
        missions = _.shuffle(missions)
        missions.forEach((mission, index) => {
          mission.visible = index < constants.cantina
          mission.save()
        })
        socketio.emit('cantina')
      }
    })
  })
})

// GET /api/mission
router.get('/', security.secured, (req, res) => {
  models.Mission.findAll({
    where: { visible: true },
    order: [[ 'id', 'ASC' ]]
  })
  .then((missions) => {
    res.status(200).json(missions)
  })
})

module.exports = router
