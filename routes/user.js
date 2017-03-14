var models = require('../models')
var express = require('express')
var router = express.Router()

// POST /api/user/login
router.post('/login', (req, res) => {
  models.User.findOne({
    where: { email: req.body.email, password: req.body.password }
  })
  .then((user) => {
    if (user) {
      user.token = Math.random().toString(36).substr(2)
      user.save()
      res.status(200).json({ token: user.token })
    } else {
      res.status(401).end()
    }
  })
})

// POST /api/user/login
router.post('/email', (req, res) => {
  models.User.findOne({
    where: { email: req.body.email }
  })
  .then((user) => {
    if (user) {
      res.status(303).end()
    } else {
      res.status(200).end()
    }
  })
})

module.exports = router
