var models = require('../models')
var express = require('express')
var router = express.Router()

const constants = require('../config/constants')
var socketio = require('../services/socketio').io()
var security = require('../services/security')
var cron = require('../services/cron')
var _ = require('lodash')
var factory = require('../factories/planet')

// add planet
cron.schedule('*/15 * * * * *', () => {
  models.Planet.create(factory.build())
  .then((planet) => {
    models.Planet.findAll({
      where: { main: false }
    })
    .then((planets) => {
      if (planets.length > 0) {
        planets = _.shuffle(planets)
        planets.forEach((planet, index) => {
          planet.visible = index < constants.exploration
          planet.save()
        })
        socketio.emit('player', null)
        socketio.emit('exploration')
      }
    })
  })
})

// GET /api/planet
router.get('/', security.secured, (req, res) => {
  models.Planet.findAll({
    order: [[ 'id', 'ASC' ]]
  })
  .then((planets) => {
    res.status(200).json(planets)
  })
})

// GET /api/planet/id
router.get('/:id', security.secured, (req, res) => {
  models.Player.findOne({
    where: { id: parseInt(req.params.id) },
    include: { model: models.Planet }
  })
  .then((player) => {
    var ids = player.Planets.map((planet) => planet.id)
    models.Planet.findAll({
      where: {
        $and: [
          { id: { $notIn: ids } },
          { visible: true }
        ]
      }
    })
    .then((planets) => {
      res.status(200).json(planets)
    })
  })
})

module.exports = router
