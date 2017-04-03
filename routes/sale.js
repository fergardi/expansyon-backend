var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/sale
router.get('/', security.secured, (req, res) => {
  models.Sale.findAll({
    include: [
      { model: models.Player, attributes: [ 'id', 'name' ], include: { model: models.Faction, attributes: [ 'class' ] } },
      { model: models.Planet },
      { model: models.Relic },
      { model: models.Ship }
    ],
    order: [[ 'datetime', 'DESC' ]]
  })
  .then((sale) => {
    res.status(200).json(sale)
  })
})

module.exports = router
