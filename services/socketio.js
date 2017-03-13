var io = require('socket.io')

var singleton

var socketio = {
  init (server) {
    singleton = io(server)
    return singleton
  },
  io () {
    return singleton
  }
}

module.exports = socketio
