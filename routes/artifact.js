var models = require('../models')
var express = require('express')
var router = express.Router()

// GET /api/artifact
router.get('/', (req, res) => {
  models.Artifact.findAll()
  .then((artifacts) => {
    res.status(200).json(artifacts)
  })
})

module.exports = router
