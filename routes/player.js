var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/player
router.get('/:id', (req, res) => {
  models.Player.findOne({
    where: { id: req.params.id },
    include: [ models.Planet, models.Artifact, models.Faction ],
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

// POST /api/player/login
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

// GET /api/player
router.get('/', (req, res) => {
  models.Player.findAll({
    attributes: { exclude: ['email', 'password', 'token'] }
  })
  .then((players) => {
    res.status(200).json(players)
  })
})

module.exports = router
