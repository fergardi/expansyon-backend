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
      planet.type = 'Fortune'
      planet.description = 'Extremely rare and rich planet full of resources'
    } else if (factory.total(planet) <= 200) {
      planet.class = 'grey'
      planet.type = 'Mortus'
      planet.description = 'Wasted planet good for nothing'
    } else if (factory.max(planet, planet.metal)) {
      planet.class = 'indigo'
      planet.type = 'Platine'
      planet.description = 'Rich planet with plenty metal'
    } else if (factory.max(planet, planet.crystal)) {
      planet.class = 'purple'
      planet.type = 'Lumina'
      planet.description = 'Rich planet with plenty crystal'
    } else if (factory.max(planet, planet.oil)) {
      planet.class = 'red'
      planet.type = 'Igneus'
      planet.description = 'Rich planet with plenty oil'
    } else if (factory.max(planet, planet.energy)) {
      planet.class = 'cyan'
      planet.type = 'Zeus'
      planet.description = 'Rich planet with plenty energy'
    } else if (factory.max(planet, planet.influence)) {
      planet.class = 'yellow'
      planet.type = 'Polites'
      planet.description = 'Strategic planet with plenty influence'
    } else if (factory.max(planet, planet.size)) {
      planet.class = 'green'
      planet.type = 'Terra'
      planet.description = 'Huge planet with plenty size'
    }
  },
  number (max) {
    return Math.floor(Math.random() * max)
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
      size: factory.number(80),
      metal: factory.number(80),
      crystal: factory.number(80),
      oil: factory.number(80),
      energy: factory.number(80),
      influence: factory.number(80),
      moon: factory.boolean(),
      station: factory.boolean(),
      visible: false
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
