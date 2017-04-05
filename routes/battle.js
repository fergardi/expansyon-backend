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
    order: [[ 'datetime', 'DESC' ]]
  })
  .then((battle) => {
    res.status(200).json(battle)
  })
})

module.exports = router
