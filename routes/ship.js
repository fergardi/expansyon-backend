var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/ship
router.get('/', security.secured, (req, res) => {
  models.Ship.findAll()
  .then((ships) => {
    res.status(200).json(ships)
  })
})

module.exports = router
