var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/tower
router.get('/', security.secured, (req, res) => {
  models.Tower.findAll()
  .then((towers) => {
    res.status(200).json(towers)
  })
})

module.exports = router
