const names = [
  'Guild'
]

const factory = {
  number (max) {
    return Math.floor(Math.random() * max)
  },
  name () {
    return names[Math.floor(Math.random() * names.length)] + factory.number(10000)
  },
  build (sequelize) {
    var guild = {
      name: factory.name(),
      description: 'Description'
    }
    if (sequelize) {
      guild = { model: 'Guild', data: guild }
    }
    return guild
  },
  bulk (quantity, sequelize) {
    var guilds = []
    for (var i = 0; i < quantity; i++) {
      guilds.push(factory.build(sequelize))
    }
    return guilds
  }
}

module.exports = factory
