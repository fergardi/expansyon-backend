var models = require('../models')
var express = require('express')
var router = express.Router()

// var socketio = require('../services/socketio').io()
var security = require('../services/security')
var jwt = require('../services/jwt')
var cron = require('../services/cron')
var planetFactory = require('../factories/planet')

// add resources every second
cron.schedule('0 * * * * *', () => {
  models.Player.findAll()
  .then((players) => {
    players.forEach((player) => {
      player.turns++
      player.save()
    })
  })
})

// GET /api/player
router.get('/:id', security.secured, (req, res) => {
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
    var info = player.toJSON()
    info.transmission = player.Received.length
    player.getShips({ order: 'id ASC' })
    .then((ships) => {
      info.fighter = ships[0].PlayerShip.quantity
      info.cruiser = ships[1].PlayerShip.quantity
      info.bomber = ships[2].PlayerShip.quantity
      info.orbiter = ships[3].PlayerShip.quantity
      info.carrier = ships[4].PlayerShip.quantity
      info.recycler = ships[5].PlayerShip.quantity
      player.getPlanets()
      .then((planets) => {
        info.size = planets.reduce((total, planet) => total + planet.size, 0)
        info.energy = planets.reduce((total, planet) => total + planet.energy, 0)
        info.influence = planets.reduce((total, planet) => total + planet.influence, 0)
        player.getRelics()
        .then((relics) => {
          info.relicarium = relics.reduce((total, relic) => total + relic.PlayerRelic.quantity, 0)
          models.Relic.count({ where: { store: true } })
          .then((count) => {
            info.store = count
            models.Sale.findAll()
            .then((sales) => {
              info.market = sales.length
              info.explore = 2
              res.status(200).json(info)
            })
          })
        })
      })
    })
  })
})

// POST /api/player/login
router.post('/login', (req, res) => {
  models.Player.findOne({
    where: { email: req.body.email, password: req.body.password }
  })
  .then((player) => {
    if (player) {
      var token = jwt.token(player)
      res.status(200).json({ id: player.id, token: token })
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
router.get('/', security.secured, (req, res) => {
  models.Player.findAll({
    attributes: { exclude: ['email', 'password'] }
  })
  .then((players) => {
    res.status(200).json(players)
  })
})

// GET /api/player/playerId/relic/relicId
router.get('/:playerId/relic/:relicId', security.secured, (req, res) => {
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
              res.status(200).json(planet)
            })
          })
        }
        // create new moon
        if (relic.moon) {
          player.getPlanets({
            where: { moon: false }
          })
          .then((planets) => {
            if (planets.length > 0) {
              var planet = planets[Math.floor(Math.random() * planets.length)]
              planet.moon = true
              planet.metal = Math.min(planet.metal + 10, 100)
              planet.crystal = Math.min(planet.crystal + 10, 100)
              planet.oil = Math.min(planet.metal + 10, 100)
              planet.size = Math.min(planet.size + 10, 100)
              planet.energy = Math.min(planet.energy + 10, 100)
              planet.influence = Math.min(planet.influence + 10, 100)
              planet.save()
              .then((planet) => {
                res.status(200).json(planet)
              })
            }
          })
        }
        // create new station
        if (relic.station) {
          player.getPlanets({
            where: { station: false }
          })
          .then((planets) => {
            if (planets.length > 0) {
              var planet = planets[Math.floor(Math.random() * planets.length)]
              planet.station = true
              planet.metal = Math.min(planet.metal + 10, 100)
              planet.crystal = Math.min(planet.crystal + 10, 100)
              planet.oil = Math.min(planet.metal + 10, 100)
              planet.size = Math.min(planet.size + 10, 100)
              planet.energy = Math.min(planet.energy + 10, 100)
              planet.influence = Math.min(planet.influence + 10, 100)
              planet.save()
              .then((planet) => {
                res.status(200).json(planet)
              })
            }
          })
        }
        // generate resources
        if (relic.turns > 0 || relic.metal > 0 || relic.crystal > 0 || relic.oil > 0) {
          player.turns += Math.floor(Math.random() * relic.turns)
          player.metal += Math.floor(Math.random() * relic.metal)
          player.crystal += Math.floor(Math.random() * relic.crystal)
          player.oil += Math.floor(Math.random() * relic.oil)
          player.save()
          .then((player) => {
            res.status(200).json(player)
          })
        }
        // create new ships
        // TODO
        // fallback
      } else {
        res.status(400).end()
      }
    })
  })
})

module.exports = router
