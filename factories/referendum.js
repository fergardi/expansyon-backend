const images = [
  'https://image.flaticon.com/icons/svg/189/189100.svg'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  number () {
    return -100 + Math.floor(Math.random() * 200) // [-100, 100)
  },
  price () {
    return 1 + Math.floor(Math.random() * 25) // [1, 25)
  },
  total (referendum) {
    return referendum.metal + referendum.crystal + referendum.oil + referendum.size + referendum.energy + referendum.influence + referendum.attack + referendum.defense + referendum.speed
  },
  class (referendum) {
    referendum.class = factory.total(referendum) >= 0 ? 'green' : 'red'
    referendum.name = 'Referendum' + ' ' + factory.total(referendum)
  },
  build (sequelize) {
    var referendum = {
      image: factory.image(),
      description: 'Description',
      metal: factory.number(),
      crystal: factory.number(),
      oil: factory.number(),
      size: factory.number(),
      energy: factory.number(),
      influence: factory.number(),
      attack: factory.number(),
      defense: factory.number(),
      speed: factory.number(),
      aether: factory.price(),
      visible: false,
      active: false,
      votes: 0
    }
    factory.class(referendum)
    if (sequelize) {
      referendum = { model: 'Referendum', data: referendum }
    }
    return referendum
  },
  bulk (quantity, sequelize) {
    var referendums = []
    for (var i = 0; i < quantity; i++) {
      referendums.push(factory.build(sequelize))
    }
    return referendums
  }
}

module.exports = factory
