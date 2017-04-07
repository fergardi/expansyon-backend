'use strict'

module.exports = (sequelize, DataTypes) => {
  var Relic = sequelize.define('Relic', {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    experience: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    level: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    planet: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    ship: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    building: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    tower: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    moon: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    station: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    reset: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    main: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    aether: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    store: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    cost: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Relic
}
