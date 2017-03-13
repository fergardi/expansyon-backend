var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/mission
router.get('/', (req, res) => {
  models.Mission.findAll()
  .then((missions) => {
    res.status(200).json(missions)
  })
})

module.exports = router
