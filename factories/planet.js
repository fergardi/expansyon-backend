var images = [
  'https://image.flaticon.com/icons/svg/124/124558.svg',
  'https://image.flaticon.com/icons/svg/124/124582.svg',
  'https://image.flaticon.com/icons/svg/139/139706.svg',
  'https://image.flaticon.com/icons/svg/139/139706.svg',
  'https://image.flaticon.com/icons/svg/124/124581.svg',
  'https://image.flaticon.com/icons/svg/139/139727.svg',
  'https://image.flaticon.com/icons/svg/207/207532.svg',
  'https://image.flaticon.com/icons/svg/308/308748.svg',
  'https://image.flaticon.com/icons/svg/124/124555.svg',
  'https://image.flaticon.com/icons/svg/139/139682.svg',
  'https://image.flaticon.com/icons/svg/139/139725.svg',
  'https://image.flaticon.com/icons/svg/139/139730.svg',
  'https://image.flaticon.com/icons/svg/139/139728.svg',
  'https://image.flaticon.com/icons/svg/231/231105.svg',
  'https://image.flaticon.com/icons/svg/327/327483.svg',
  'https://image.flaticon.com/icons/svg/305/305895.svg',
  'https://image.flaticon.com/icons/svg/310/310121.svg',
  'https://image.flaticon.com/icons/svg/234/234298.svg',
  'https://image.flaticon.com/icons/svg/139/139693.svg',
  'https://image.flaticon.com/icons/svg/139/139707.svg',
  'https://image.flaticon.com/icons/svg/270/270146.svg',
  'https://image.flaticon.com/icons/svg/124/124559.svg'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  type (planet) {
    if (factory.total(planet) >= 400) {
      planet.class = 'orange'
      planet.type = 'FORTUNE'
      planet.description = 'Extremely rare and rich planet.'
    } else if (factory.total(planet) <= 200) {
      planet.class = 'grey'
      planet.type = 'MORTUS'
      planet.description = 'Wasted planet good for nothing.'
    } else if (factory.max(planet, planet.metal)) {
      planet.class = 'indigo'
      planet.type = 'PLATINUM'
      planet.description = 'Rich planet with plenty METAL.'
    } else if (factory.max(planet, planet.crystal)) {
      planet.class = 'purple'
      planet.type = 'LUMINA'
      planet.description = 'Rich planet with plenty CRYSTAL.'
    } else if (factory.max(planet, planet.oil)) {
      planet.class = 'red'
      planet.type = 'IGNEUS'
      planet.description = 'Rich planet with plenty OIL.'
    } else if (factory.max(planet, planet.energy)) {
      planet.class = 'cyan'
      planet.type = 'ZEUS'
      planet.description = 'Rich planet with plenty ENERGY.'
    } else if (factory.max(planet, planet.influence)) {
      planet.class = 'yellow'
      planet.type = 'POLITES'
      planet.description = 'Strategic planet with plenty INFLUENCE.'
    } else if (factory.max(planet, planet.size)) {
      planet.class = 'green'
      planet.type = 'TERRA'
      planet.description = 'Huge planet with plenty SIZE.'
    }
  },
  number () {
    return 0 + Math.floor(Math.random() * 90) // [0, 90)
  },
  boolean () {
    return Math.floor(Math.random() * 10) >= 5
  },
  total (planet) {
    return planet.size + planet.metal + planet.crystal + planet.oil + planet.energy + planet.influence
  },
  max (planet, number) {
    return number === Math.max(planet.size, planet.metal, planet.crystal, planet.oil, planet.energy, planet.influence)
  },
  build (sequelize) {
    var planet = {
      image: factory.image(),
      size: factory.number(),
      metal: factory.number(),
      crystal: factory.number(),
      oil: factory.number(),
      energy: factory.number(),
      influence: factory.number(),
      moon: factory.boolean(),
      station: factory.boolean(),
      active: false
    }
    factory.type(planet)
    if (sequelize) {
      planet = { model: 'Planet', data: planet }
    }
    return planet
  },
  bulk (quantity, sequelize) {
    var planets = []
    for (var i = 0; i < quantity; i++) {
      planets.push(factory.build(sequelize))
    }
    return planets
  }
}

module.exports = factory
