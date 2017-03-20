var jwt = require('jwt-simple')
var moment = require('moment')
const constants = require('../config/constants')

exports.secured = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).end()
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, constants.token, true)
  if (payload.exp <= moment().unix()) {
    return res.status(401).end()
  }
  req.user = payload.sub
  next()
}
