'use strict'

module.exports = (sequelize, DataTypes) => {
  var Faction = sequelize.define('Faction', {
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    energy: DataTypes.INTEGER,
    influence: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    description: DataTypes.STRING,
    class: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Faction
}
