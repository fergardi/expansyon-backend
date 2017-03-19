var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/building
router.get('/', security.secured, (req, res) => {
  models.Building.findAll()
  .then((buildings) => {
    res.status(200).json(buildings)
  })
})

module.exports = router
