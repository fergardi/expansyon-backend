var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/battle
router.get('/', security.secured, (req, res) => {
  models.Battle.findAll({
    include: [
      { model: models.Player, include: { model: models.Faction } },
      { model: models.Planet },
      { model: models.Mission },
      { model: models.Ship }
    ],
    order: [[ 'end', 'DESC' ]]
  })
  .then((battle) => {
    res.status(200).json(battle)
  })
})

// POST /api/battle
router.post('/', security.secured, (req, res) => {
  models.Planet.findById(parseInt(req.body.PlanetId))
  .then((planet) => {
    if (planet) {
      models.Player.findById(parseInt(req.body.PlayerId))
      .then((player) => {
        if (player) {
          player.getShips()
          .then((ships) => {
            var fighter = parseInt(req.body.fighter)
            var cruiser = parseInt(req.body.cruiser)
            var bomber = parseInt(req.body.bomber)
            if (fighter <= ships[0].PlayerShip.quantity && cruiser <= ships[1].PlayerShip.quantity && bomber <= ships[0].PlayerShip.quantity) {
              ships[0].PlayerShip.quantity -= fighter
              ships[0].PlayerShip.save()
              ships[1].PlayerShip.quantity -= cruiser
              ships[1].PlayerShip.save()
              ships[2].PlayerShip.quantity -= bomber
              ships[2].PlayerShip.save()
              models.Battle.create({
                MissionId: req.body.MissionId ? parseInt(req.body.MissionId) : null,
                PlanetId: req.body.PlanetId ? parseInt(req.body.PlanetId) : null,
                PlayerId: player.id
              })
              .then((battle) => {
                battle.addShip(ships[0], { quantity: fighter })
                battle.addShip(ships[1], { quantity: cruiser })
                battle.addShip(ships[2], { quantity: bomber })
                battle.save()
                .then((battle) => {
                  res.status(200).json(battle)
                })
              })
            } else {
              res.status(400).end()
            }
          })
        } else {
          res.status(400).end()
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

module.exports = router
