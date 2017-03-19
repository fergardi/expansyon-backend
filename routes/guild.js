var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/guild
router.get('/', security.secured, (req, res) => {
  models.Guild.findAll()
  .then((guilds) => {
    res.status(200).json(guilds)
  })
})

module.exports = router
