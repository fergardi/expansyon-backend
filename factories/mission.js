const images = [
  'https://image.flaticon.com/icons/svg/139/139692.svg'
]

const names = [
  'mission.example.name'
]

const descriptions = [
  'mission.example.description'
]

const classes = [
  'red',
  'green',
  'yellow'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  name () {
    return names[Math.floor(Math.random() * names.length)]
  },
  description () {
    return descriptions[Math.floor(Math.random() * descriptions.length)]
  },
  number (max) {
    return Math.floor(Math.random() * max)
  },
  class () {
    return classes[Math.floor(Math.random() * classes.length)]
  },
  build (sequelize) {
    var mission = {
      image: factory.image(),
      name: factory.name(),
      description: factory.description(),
      class: factory.class(),
      attack: factory.number(10000),
      defense: factory.number(10000),
      speed: factory.number(10000),
      visible: true
    }
    if (sequelize) {
      mission = { model: 'Mission', data: mission }
    }
    return mission
  },
  bulk (quantity, sequelize) {
    var missions = []
    for (var i = 0; i < quantity; i++) {
      missions.push(factory.build(sequelize))
    }
    return missions
  }
}

module.exports = factory
