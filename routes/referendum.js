var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/referendum
router.get('/', (req, res) => {
  models.Referendum.findAll()
  .then((referendums) => {
    res.status(200).json(referendums)
  })
})

module.exports = router
