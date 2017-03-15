var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/planet
router.get('/', (req, res) => {
  models.Planet.findAll()
  .then((planets) => {
    res.status(200).json(planets)
  })
})

// GET /api/planet/id
router.get('/:id', (req, res) => {
  models.Player.findOne({
    where: { id: req.params.id },
    include: { model: models.Planet }
  })
  .then((player) => {
    var ids = player.Planets.map((planet) => planet.id)
    models.Planet.findAll({
      where: { id: { $notIn: ids } }
    })
    .then((planets) => {
      res.status(200).json(planets)
    })
  })
})

module.exports = router
