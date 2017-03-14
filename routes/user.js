var models = require('../models')
var express = require('express')
var router = express.Router()

// POST /api/user/login
router.post('/login', (req, res) => {
  models.User.find({
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

module.exports = router
