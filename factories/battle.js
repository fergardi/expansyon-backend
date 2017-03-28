const fixtures = require('../config/fixtures')

const factory = {
  id (max) {
    return 1 + Math.floor(Math.random() * max)
  },
  array (length) {
    return [...new Set([...new Array(1 + Math.floor(Math.random() * length))].map(() => 1 + Math.floor(Math.random() * length)))]
  },
  build (sequelize) {
    var battle = {
      From: factory.id(fixtures.players),
      To: factory.id(fixtures.players),
      Ships: factory.array(6)
    }
    if (sequelize) {
      battle = { model: 'Battle', data: battle }
    }
    return battle
  },
  bulk (quantity, sequelize) {
    var battles = []
    for (var i = 0; i < quantity; i++) {
      battles.push(factory.build(sequelize))
    }
    return battles
  }
}

module.exports = factory
