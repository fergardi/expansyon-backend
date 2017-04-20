'use strict'

module.exports = (sequelize, DataTypes) => {
  var Mission = sequelize.define('Mission', {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    lat: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
    lng: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 }
  }, {
    classMethods: {
      associate: (models) => {
        // m2m association
        var MissionShip = sequelize.define('MissionShip', {
          quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Ship.belongsToMany(models.Mission, { through: MissionShip })
        models.Mission.belongsToMany(models.Ship, { through: MissionShip })
      }
    },
    getterMethods: {
      total () {
        return this.getShips().then((ships) => ships.reduce((total, ship) => total + ship.MissionShip.quantity, 0))
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Mission
}
