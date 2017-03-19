var models = require('../models')
var express = require('express')
var router = express.Router()

var planetFactory = require('../factories/planet')

// GET /api/player
router.get('/:id', (req, res) => {
  models.Player.findOne({
    where: { id: req.params.id },
    include: [
      models.Planet,
      models.Relic,
      models.Guild,
      models.Faction,
      { model: models.Message, as: 'Sent', include: { model: models.Player, as: 'To', attributes: ['name'], include: { model: models.Faction } } },
      { model: models.Message, as: 'Received', include: { model: models.Player, as: 'From', attributes: ['name'], include: { model: models.Faction } } }
    ],
    attributes: { exclude: ['password', 'token'] }
  })
  .then((player) => {
    res.status(200).json(player)
  })
})

// POST /api/player/login
router.post('/login', (req, res) => {
  models.Player.findOne({
    where: { email: req.body.email, password: req.body.password }
  })
  .then((player) => {
    if (player) {
      player.token = Math.random().toString(36).substr(2)
      player.save()
      res.status(200).json({ id: player.id, token: player.token })
    } else {
      res.status(401).end()
    }
  })
})

// POST /api/player/email
router.post('/email', (req, res) => {
  models.Player.findOne({
    where: { email: req.body.email }
  })
  .then((player) => {
    if (player) {
      res.status(303).end()
    } else {
      res.status(200).end()
    }
  })
})

// POST /api/player/name
router.post('/name', (req, res) => {
  models.Player.findOne({
    where: { name: req.body.name }
  })
  .then((player) => {
    if (player) {
      res.status(303).end()
    } else {
      res.status(200).end()
    }
  })
})

// GET /api/player
router.get('/', (req, res) => {
  models.Player.findAll({
    attributes: { exclude: ['email', 'password', 'token'] }
  })
  .then((players) => {
    res.status(200).json(players)
  })
})

// GET /api/player/playerId/relic/relicId
router.get('/:playerId/relic/:relicId', (req, res) => {
  models.Player.findOne({
    where: { id: req.params.playerId }
  })
  .then((player) => {
    player.getRelics({
      where: { id: req.params.relicId }
    })
    .then((relics) => {
      if (relics.length > 0) {
        var relic = relics[0]
        if (relic.PlayerRelic.quantity <= 1) {
          player.removeRelic(relic)
        } else {
          relic.PlayerRelic.quantity--
          relic.PlayerRelic.save()
        }
        // create new planet
        if (relic.planet) {
          models.Planet.create(planetFactory.build())
          .then((planet) => {
            player.addPlanet(planet)
            .then((player) => {
              // return updated player
              res.status(200).json(player)
            })
          })
        }
        // create new moon
        // TODO
        // create new station
        // TODO
        // create new ships
        // TODO
        // generate resources
        // TODO
      } else {
        res.status(405).end()
      }
    })
  })
})

module.exports = router
