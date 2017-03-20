var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/referendum
router.get('/', security.secured, (req, res) => {
  models.Referendum.findAll({ where: { active: true } })
  .then((referendums) => {
    res.status(200).json(referendums)
  })
})

module.exports = router
