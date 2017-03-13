var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/tower
router.get('/', (req, res) => {
  models.Tower.findAll()
  .then((towers) => {
    res.status(200).json(towers)
  })
})

module.exports = router
