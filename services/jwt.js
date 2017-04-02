var jwt = require('jwt-simple')
var moment = require('moment')
const config = require('../config/config')

exports.token = (player) => {
  var payload = {
    sub: player.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, config.token)
}
