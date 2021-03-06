const fixtures = require('../config/fixtures')

const images = [
  'https://image.flaticon.com/icons/svg/124/124558.svg'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  name () {
    return 'Player#' + factory.number(10000)
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
  number (max) {
    return 0 + Math.floor(Math.random() * max)
  },
  id (max) {
    return 1 + Math.floor(Math.random() * max)
  },
  array (max) {
    return [...new Set([...new Array(1 + Math.floor(Math.random() * max))].map(() => 1 + Math.floor(Math.random() * max)))]
  },
  array2 (length, max) {
    return [...new Set([...new Array(length)].map(() => 1 + Math.floor(Math.random() * max)))]
  },
  array3 (max) {
    return Array.from(Array(max).keys())
  },
  build (sequelize) {
    var player = {
      email: factory.email(),
      password: factory.password(),
      name: factory.name(),
      image: factory.image(),
      metal: factory.number(10000),
      crystal: factory.number(5000),
      oil: factory.number(1000),
      experience: factory.number(1000),
      aether: factory.number(5),
      level: 1,
      Relics: [],
      Planets: [],
      Buildings: [
        { id: 1, _through: { quantity: factory.number(10) } },
        { id: 2, _through: { quantity: factory.number(10) } },
        { id: 3, _through: { quantity: factory.number(10) } },
        { id: 4, _through: { quantity: factory.number(10) } },
        { id: 5, _through: { quantity: factory.number(10) } },
        { id: 6, _through: { quantity: factory.number(10) } }
      ],
      Towers: [
        { id: 1, _through: { quantity: factory.number(10) } },
        { id: 2, _through: { quantity: factory.number(10) } },
        { id: 3, _through: { quantity: factory.number(10) } }
      ],
      Ships: [
        { id: 1, _through: { quantity: factory.number(10) } },
        { id: 2, _through: { quantity: factory.number(10) } },
        { id: 3, _through: { quantity: factory.number(10) } },
        { id: 4, _through: { quantity: factory.number(10) } },
        { id: 5, _through: { quantity: factory.number(10) } },
        { id: 6, _through: { quantity: factory.number(10) } }
      ],
      Skills: factory.array3(30),
      Achievements: factory.array(6),
      GuildId: factory.id(fixtures.guilds),
      FactionId: factory.id(6)
    }
    if (sequelize) {
      player = { model: 'Player', data: player }
    }
    return player
  },
  bulk (quantity, sequelize) {
    var players = []
    for (var i = 0; i < quantity; i++) {
      var player = factory.build(sequelize)
      if (sequelize) player.data.Planets = [i + 2]
      players.push(player)
    }
    return players
  }
}

module.exports = factory
