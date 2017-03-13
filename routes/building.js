var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/building
router.get('/', (req, res) => {
  models.Building.findAll()
  .then((buildings) => {
    res.status(200).json(buildings)
  })
})

module.exports = router
