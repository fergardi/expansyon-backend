const factory = {
  id () {
    return 1 + Math.floor(Math.random() * 9) // [1, 10)
  },
  build (sequelize) {
    var message = {
      subject: 'Subject',
      text: 'Text',
      From: factory.id(),
      To: factory.id()
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
