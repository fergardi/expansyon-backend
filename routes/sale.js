var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/sale
router.get('/', (req, res) => {
  models.Sale.findAll({
    include: [ { model: models.Planet }, { model: models.Artifact }, { model: models.Ship } ]
  })
  .then((sale) => {
    res.status(200).json(sale)
  })
})

// GET /api/planet/id
router.get('/:id', (req, res) => {
  models.Sale.findOne({
    where: { id: req.params.id },
    include: [ { model: models.Planet }, { model: models.Artifact }, { model: models.Ship } ]
  })
  .then((sale) => {
    res.status(200).json(sale)
  })
})

module.exports = router
