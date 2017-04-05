var jwt = require('jwt-simple')
var moment = require('moment')
const config = require('../config/config')

exports.secured = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).end()
  }
  var token = req.headers.authorization.split(' ')[1]
  try {
    var payload = jwt.decode(token, config.token, false)
    if (payload.exp <= moment().unix()) {
      return res.status(401).end()
    }
    req.user = payload.sub
  } catch (err) {
    return res.status(401).end()
  }
  next()
}
