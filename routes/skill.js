var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/skill
router.get('/', (req, res) => {
  models.Skill.findAll()
  .then((skills) => {
    res.status(200).json(skills)
  })
})

// GET /api/skill/tree
router.get('/tree', (req, res) => {
  models.Skill.findAll()
  .then((skills) => {
    res.status(200).json(skills)
  })
})

module.exports = router
