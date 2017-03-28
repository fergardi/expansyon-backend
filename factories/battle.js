const factory = {
  id () {
    return 1 + Math.floor(Math.random() * 9) // [1, 10)
  },
  build (sequelize) {
    var battle = {
      From: factory.id(),
      To: factory.id(),
      Ships: []
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
