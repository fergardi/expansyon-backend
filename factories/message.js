const factory = {
  text () {
    return Math.random().toString(36).substring(2)
  },
  number () {
    return 1 + Math.floor(Math.random() * 9) // [1, 10)
  },
  build (sequelize) {
    var message = {
      subject: factory.text(),
      text: factory.text(),
      From: factory.number(),
      To: factory.number()
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
