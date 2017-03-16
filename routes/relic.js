var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/relic
router.get('/', (req, res) => {
  models.Relic.findAll()
  .then((relics) => {
    res.status(200).json(relics)
  })
})

// GET /api/relic/store
router.get('/store', (req, res) => {
  models.Relic.findAll({
    where: { store: true }
  })
  .then((relics) => {
    res.status(200).json(relics)
  })
})

module.exports = router
