var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/faction
router.get('/', (req, res) => {
  models.Faction.findAll()
  .then((factions) => {
    res.status(200).json(factions)
  })
})

module.exports = router
