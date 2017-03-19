var jwt = require('jwt-simple')
var moment = require('moment')
const constants = require('../config/constants')

exports.token = (player) => {
  var payload = {
    sub: player.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, constants.token)
}
