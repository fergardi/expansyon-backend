const images = [
  'https://image.flaticon.com/icons/svg/189/189100.svg'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  number (max) {
    return -max + Math.floor(Math.random() * max * 2)
  },
  price (max) {
    return 3 + Math.floor(Math.random() * max)
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
      metal: factory.number(100),
      crystal: factory.number(100),
      oil: factory.number(100),
      size: factory.number(100),
      energy: factory.number(100),
      influence: factory.number(100),
      attack: factory.number(100),
      defense: factory.number(100),
      speed: factory.number(100),
      aether: factory.price(25),
      visible: true,
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
