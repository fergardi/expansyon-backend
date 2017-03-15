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

// GET /api/artifact/store
router.get('/store', (req, res) => {
  models.Artifact.findAll({
    where: { store: true }
  })
  .then((artifacts) => {
    res.status(200).json(artifacts)
  })
})

module.exports = router
