var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/skill
router.get('/', security.secured, (req, res) => {
  models.Skill.findAll({
    order: [[ 'id', 'ASC' ]]
  })
  .then((skills) => {
    res.status(200).json(skills)
  })
})

module.exports = router
