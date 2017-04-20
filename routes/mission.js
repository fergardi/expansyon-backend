var models = require('../models')
var express = require('express')
var router = express.Router()

// const constants = require('../config/constants')
var security = require('../services/security')
var socketio = require('../services/socketio').io()
var cron = require('../services/cron')
// var _ = require('lodash')
var factory = require('../factories/mission')

// add mission
cron.schedule('30 * * * * *', () => {
  // battles
  // TODO
  // new missions
  models.Ship.findAll({
    order: [[ 'id', 'ASC' ]]
  })
  .then((ships) => {
    var created = factory.build()
    models.Mission.create(created)
    .then((mission) => {
      mission.addShip(ships[0], { quantity: created.Ships[0]._through.quantity })
      mission.addShip(ships[1], { quantity: created.Ships[1]._through.quantity })
      mission.addShip(ships[2], { quantity: created.Ships[2]._through.quantity })
      mission.save()
      .then((mission) => {
        socketio.emit('galaxy')
      })
    })
  })
})

// GET /api/mission
router.get('/', security.secured, (req, res) => {
  models.Mission.findAll({
    include: { model: models.Ship },
    order: [[ 'id', 'ASC' ]]
  })
  .then((missions) => {
    res.status(200).json(missions)
  })
})

module.exports = router
