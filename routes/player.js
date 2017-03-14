var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/player
router.get('/', (req, res) => {
  models.Player.findAll()
  .then((players) => {
    res.status(200).json(players)
  })
})

module.exports = router
