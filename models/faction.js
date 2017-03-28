'use strict'

module.exports = (sequelize, DataTypes) => {
  var Faction = sequelize.define('Faction', {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    size: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    energy: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    influence: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    attack: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    defense: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    speed: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    aether: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Faction
}
