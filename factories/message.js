const fixtures = require('../config/fixtures')

const factory = {
  id (max) {
    return 1 + Math.floor(Math.random() * max)
  },
  build (sequelize) {
    var message = {
      subject: 'Subject',
      text: 'Text',
      From: factory.id(fixtures.players),
      To: factory.id(fixtures.players)
    }
    if (sequelize) {
      message = { model: 'Message', data: message }
    }
    return message
  },
  bulk (quantity, sequelize) {
    var messages = []
    for (var i = 0; i < quantity; i++) {
      messages.push(factory.build(sequelize))
    }
    return messages
  }
}

module.exports = factory
