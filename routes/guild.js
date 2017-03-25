var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/guild
router.get('/', security.secured, (req, res) => {
  models.Guild.findAll({
    include: { model: models.Player, include: { model: models.Planet }, separate: true }
  })
  .then((guilds) => {
    var info = []
    guilds.forEach((guild) => {
      guild = guild.toJSON()
      guild.influence = 0
      guild.members = guild.Players.length
      guild.Players.forEach((player) => {
        guild.influence += player.Planets.reduce((total, planet) => total + planet.influence, 0)
      })
      info.push(guild)
    })
    res.status(200).json(info)
  })
})

module.exports = router
