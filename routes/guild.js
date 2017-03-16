var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/guild
router.get('/', (req, res) => {
  models.Guild.findAll()
  .then((guilds) => {
    res.status(200).json(guilds)
  })
})

module.exports = router
