const images = [
  'https://image.flaticon.com/icons/svg/124/124558.svg'
]

const names = [
  'Player'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  name () {
    return names[Math.floor(Math.random() * names.length)] + factory.number()
  },
  text () {
    return Math.random().toString(36).substring(2)
  },
  email () {
    return factory.text() + '@' + factory.text() + '.com'
  },
  password () {
    return 'test'
  },
  number () {
    return 0 + Math.floor(Math.random() * 1000) // [0, 100)
  },
  build (sequelize) {
    var player = {
      email: factory.email(),
      password: factory.password(),
      name: factory.name(),
      image: factory.image(),
      turns: factory.number(),
      metal: factory.number(),
      crystal: factory.number(),
      oil: factory.number(),
      experience: factory.number(),
      skills: 1,
      aether: factory.number()
    }
    if (sequelize) {
      player = { model: 'Player', data: player }
    }
    return player
  },
  bulk (quantity, sequelize) {
    var players = []
    for (var i = 0; i < quantity; i++) {
      players.push(factory.build(sequelize))
    }
    return players
  }
}

module.exports = factory
