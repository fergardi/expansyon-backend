var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/sale
router.get('/', security.secured, (req, res) => {
  models.Sale.findAll({
    include: [ { model: models.Planet }, { model: models.Relic }, { model: models.Ship } ]
  })
  .then((sale) => {
    res.status(200).json(sale)
  })
})

// GET /api/sale/id
router.get('/:id', security.secured, (req, res) => {
  models.Sale.findOne({
    where: { id: req.params.id },
    include: [ { model: models.Planet }, { model: models.Relic }, { model: models.Ship } ]
  })
  .then((sale) => {
    res.status(200).json(sale)
  })
})

module.exports = router
