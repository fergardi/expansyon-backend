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
  id () {
    return 1 + Math.floor(Math.random() * 5) // [0, 5)
  },
  array (length) {
    return [...new Set([...new Array(1 + Math.floor(Math.random() * length))].map(() => 1 + Math.floor(Math.random() * length)))]
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
      aether: factory.number(),
      level: 1,
      Relics: factory.array(6),
      Planets: factory.array(50),
      Buildings: factory.array(6),
      Towers: factory.array(3),
      Ships: factory.array(6),
      Achievements: factory.array(6)
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
