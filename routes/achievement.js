var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/achievement
router.get('/', security.secured, (req, res) => {
  models.Achievement.findAll({
    order: [[ 'id', 'ASC' ]]
  })
  .then((achievements) => {
    res.status(200).json(achievements)
  })
})

module.exports = router
