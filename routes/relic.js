var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/relic
router.get('/', security.secured, (req, res) => {
  models.Relic.findAll()
  .then((relics) => {
    res.status(200).json(relics)
  })
})

// GET /api/relic/store
router.get('/store', security.secured, (req, res) => {
  models.Relic.findAll({
    where: { store: true }
  })
  .then((relics) => {
    res.status(200).json(relics)
  })
})

module.exports = router
