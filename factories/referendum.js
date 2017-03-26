const images = [
  'https://image.flaticon.com/icons/svg/189/189100.svg'
]

const names = [
  'referendum.example'
]

const classes = [
  'red',
  'green'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  name () {
    return names[Math.floor(Math.random() * names.length)]
  },
  number () {
    return 0 + Math.floor(Math.random() * 100) // [0, 100)
  },
  price () {
    return 1 + Math.floor(Math.random() * 25) // [1, 25)
  },
  class () {
    return classes[Math.floor(Math.random() * classes.length)]
  },
  build (sequelize) {
    var referendum = {
      image: factory.image(),
      name: factory.name(),
      description: 'Description',
      class: factory.class(),
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
      active: false
    }
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
