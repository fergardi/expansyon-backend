var models = require('../models')
var express = require('express')
var router = express.Router()

const constants = require('../config/constants')
var security = require('../services/security')
var socketio = require('../services/socketio').io()
var cron = require('../services/cron')
var _ = require('lodash')
var factory = require('../factories/referendum')

// add referendum
cron.schedule('*/10 * * * * *', () => {
  models.Referendum.create(factory.build())
  .then((referendum) => {
    models.Referendum.update({ visible: false, active: false }, { where: {} })
    .then((referendums) => {
      models.Referendum.findOne({ order: 'votes DESC' })
      .then((referendum) => {
        referendum.active = true
        referendum.save()
        .then((referendum) => {
          models.Referendum.update({ votes: 0 }, { where: {} })
          .then((referendums) => {
            models.Referendum.findAll({ where: { active: false } })
            .then((referendums) => {
              if (referendums.length > 0) {
                referendums = _.shuffle(referendums)
                for (var i = 0; i < constants.senate; i++) {
                  referendums[i].visible = true
                  referendums[i].save()
                }
                socketio.emit('senate')
              }
            })
          })
        })
      })
    })
  })
})

// GET /api/referendum
router.get('/', security.secured, (req, res) => {
  models.Referendum.findAll({
    where: {
      $and: [
        { visible: true },
        { active: false }
      ]
    },
    order: [[ 'id', 'ASC' ]]
  })
  .then((referendums) => {
    res.status(200).json(referendums)
  })
})

module.exports = router
