'use strict'

module.exports = (sequelize, DataTypes) => {
  var Mission = sequelize.define('Mission', {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    experience: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    aether: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    lat: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
    lng: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 }
  }, {
    classMethods: {
      associate: (models) => {
        // m2o association
        models.Mission.belongsTo(models.Relic)
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
    timestamps: false,
    freezeTableName: true
  })
  return Mission
}
