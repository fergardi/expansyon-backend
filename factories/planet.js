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
  vocale () {
    var v = ['a', 'e', 'i', 'o', 'u', 'y']
    return v[Math.floor(Math.random() * v.length)]
  },
  consonant () {
    var c = ['b', 'c', 'd', 'f', 'g', 'j', 'k', 'm', 'n', 'p', 'q', 's', 't', 'v', 'w', 'x', 'z']
    return c[Math.floor(Math.random() * c.length)]
  },
  nasal () {
    var n = ['h', 'r', 'l']
    return n[Math.floor(Math.random() * n.length)]
  },
  syllabe (min, max) {
    return [...new Array(min + Math.floor(Math.random() * max))].map(() => factory.consonant() + (Math.random() * 100 <= 25 ? factory.nasal() : '') + factory.vocale())
  },
  word () {
    var w = factory.syllabe(2, 3).join('')
    return w.charAt(0).toUpperCase() + w.slice(1)
  },
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  type (planet) {
    if (factory.total(planet) >= 400) {
      planet.class = 'orange'
      planet.description = 'planet.rich.description'
    } else if (factory.total(planet) <= 200) {
      planet.class = 'grey'
      planet.description = 'planet.wasted.description'
    } else if (factory.max(planet, planet.metal)) {
      planet.class = 'indigo'
      planet.description = 'planet.metal.description'
    } else if (factory.max(planet, planet.crystal)) {
      planet.class = 'purple'
      planet.description = 'planet.crystal.description'
    } else if (factory.max(planet, planet.oil)) {
      planet.class = 'yellow'
      planet.description = 'planet.oil.description'
    } else if (factory.max(planet, planet.energy)) {
      planet.class = 'cyan'
      planet.description = 'planet.energy.description'
    } else if (factory.max(planet, planet.influence)) {
      planet.class = 'red'
      planet.description = 'planet.influence.description'
    } else if (factory.max(planet, planet.size)) {
      planet.class = 'green'
      planet.description = 'planet.size.description'
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
      name: factory.word(),
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
