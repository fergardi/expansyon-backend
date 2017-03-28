'use strict'

module.exports = (sequelize, DataTypes) => {
  var Tower = sequelize.define('Tower', {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    attack: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    defense: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    speed: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Tower
}
