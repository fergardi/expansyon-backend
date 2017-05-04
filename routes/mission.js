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
cron.schedule('*/5 * * * * *', () => {
  // battles
  models.Battle.findAll({
    where: { MissionId: { $ne: null } },
    include: [
      { model: models.Ship },
      { model: models.Mission, include: { model: models.Ship } },
      { model: models.Player, include: { model: models.Skill } }
    ]
  })
  .then((battles) => {
    if (battles.length > 0) {
      battles.forEach((battle) => {
        // TODO simple, stupid battle
        var attacker = 0
        battle.Ships.forEach((ship) => {
          attacker += ship.BattleShip.quantity
        })
        var defender = 0
        battle.Mission.Ships.forEach((ship) => {
          defender += ship.MissionShip.quantity
        })
        console.log('Attacker: ', attacker, ', Defender: ', defender)
        // win
        if (attacker > defender) {
          battle.Player.metal += battle.Mission.metal
          battle.Player.crystal += battle.Mission.crystal
          battle.Player.oil += battle.Mission.oil
          battle.Player.aether += battle.Mission.aether
          battle.Player.experience += battle.Mission.experience
          battle.Player.save()
        }
      })
    }
    models.Battle.destroy({
      where: { MissionId: { $ne: null } }
    })
    .then(() => {
      models.Mission.destroy({
        where: {}
      })
    })
    // new missions
    models.Ship.findAll({
      order: [[ 'id', 'ASC' ]]
    })
    .then((ships) => {
      models.Player.findAll()
      .then((players) => {
        players.forEach((player) => {
          var created = factory.build()
          models.Mission.create(created)
          .then((mission) => {
            mission.addShip(ships[0], { quantity: created.Ships[0]._through.quantity })
            mission.addShip(ships[1], { quantity: created.Ships[1]._through.quantity })
            mission.addShip(ships[2], { quantity: created.Ships[2]._through.quantity })
            mission.save()
          })
        })
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
