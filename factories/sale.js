const factory = {
  number () {
    return Math.floor(Math.random() * 50000) // [0, 50000)
  },
  id () {
    return 1 + Math.floor(Math.random() * 5) // [1, 5)
  },
  type (sale) {
    var item = Math.floor(Math.random() * 30)
    if (item >= 10) {
      sale.PlanetId = factory.id()
    } else if (item >= 20) {
      sale.RelicId = factory.id()
      sale.quantity = factory.number()
    } else {
      sale.ShipId = factory.id()
      sale.quantity = factory.number()
    }
  },
  build (sequelize) {
    var sale = {
      quantity: null,
      metal: factory.number(),
      crystal: factory.number(),
      oil: factory.number(),
      aether: factory.number(),
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
