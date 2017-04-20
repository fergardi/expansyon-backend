const images = [
  'https://image.flaticon.com/icons/svg/389/389025.svg',
  'https://image.flaticon.com/icons/svg/389/389029.svg',
  'https://image.flaticon.com/icons/svg/389/389027.svg',
  'https://image.flaticon.com/icons/svg/389/389033.svg',
  'https://image.flaticon.com/icons/svg/389/389023.svg',
  'https://image.flaticon.com/icons/svg/389/389030.svg',
  'https://image.flaticon.com/icons/svg/389/389024.svg'
]

const names = [
  'mission.example'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  float (min, max) {
    return min + Math.random() * (max - min)
  },
  name () {
    return names[Math.floor(Math.random() * names.length)]
  },
  number (max) {
    return Math.floor(Math.random() * max)
  },
  type (mission) {
    var fighter = Math.random() * 100000
    var cruiser = Math.random() * 10000
    var bomber = Math.random() * 1000
    mission.Ships = [
      { id: 1, _through: { quantity: fighter } },
      { id: 2, _through: { quantity: cruiser } },
      { id: 3, _through: { quantity: bomber } }
    ]
    var total = fighter + cruiser + bomber
    mission.class = total >= 100000
      ? 'red'
      : total >= 50000
        ? 'yellow'
        : 'green'
  },
  build (sequelize) {
    var mission = {
      image: factory.image(),
      name: factory.name(),
      lat: factory.float(-90, 90),
      lng: factory.float(-180, 180)
    }
    factory.type(mission)
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
