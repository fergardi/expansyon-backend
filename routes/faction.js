var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/faction
router.get('/', security.secured, (req, res) => {
  models.Faction.findAll()
  .then((factions) => {
    res.status(200).json(factions)
  })
})

module.exports = router
