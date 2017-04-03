var models = require('../models')
var express = require('express')
var router = express.Router()

var security = require('../services/security')

// GET /api/tree
router.get('/', security.secured, (req, res) => {
  models.Tree.findAll({
    include: { model: models.Skill, separate: true },
    order: [[ 'id', 'ASC' ]]
  })
  .then((trees) => {
    res.status(200).json(trees)
  })
})

module.exports = router
