const fixtures = require('../config/fixtures')

const factory = {
  number (max) {
    return Math.floor(Math.random() * max)
  },
  id (max) {
    return 1 + Math.floor(Math.random() * max)
  },
  type (sale) {
    var item = Math.floor(Math.random() * 30)
    if (item >= 20) {
      sale.PlanetId = factory.id(fixtures.planets)
    } else if (item >= 10) {
      sale.RelicId = factory.id(6)
      sale.quantity = factory.number(2)
    } else {
      sale.ShipId = factory.id(6)
      sale.quantity = factory.number(10000)
    }
  },
  build (sequelize) {
    var sale = {
      quantity: 0,
      metal: factory.number(10000),
      crystal: factory.number(10000),
      oil: factory.number(10000),
      aether: factory.number(50),
      PlanetId: null,
      RelicId: null,
      ShipId: null
    }
    factory.type(sale)
    if (sequelize) {
      sale = { model: 'Sale', data: sale }
    }
    return sale
  },
  bulk (quantity, sequelize) {
    var sales = []
    for (var i = 0; i < quantity; i++) {
      sales.push(factory.build(sequelize))
    }
    return sales
  }
}

module.exports = factory
