var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/mission
router.get('/', security.secured, (req, res) => {
  models.Mission.findAll()
  .then((missions) => {
    res.status(200).json(missions)
  })
})

module.exports = router
