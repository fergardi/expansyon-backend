const names = [
  'Guild'
]

const factory = {
  name () {
    return names[Math.floor(Math.random() * names.length)] + factory.number()
  },
  number () {
    return 0 + Math.floor(Math.random() * 100) // [0, 100)
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
