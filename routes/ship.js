var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/ship
router.get('/', (req, res) => {
  models.Ship.findAll()
  .then((ships) => {
    res.status(200).json(ships)
  })
})

module.exports = router
