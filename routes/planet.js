var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/planet
router.get('/', (req, res) => {
  models.Planet.findAll()
  .then((planets) => {
    res.status(200).json(planets)
  })
})

module.exports = router
