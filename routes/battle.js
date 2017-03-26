var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/battle
router.get('/', security.secured, (req, res) => {
  models.Battle.findAll({
    include: [
      { model: models.Player, as: 'From', include: { model: models.Faction } },
      { model: models.Player, as: 'To', include: { model: models.Faction } },
      { model: models.Ship }
    ]
  })
  .then((battle) => {
    res.status(200).json(battle)
  })
})

module.exports = router
