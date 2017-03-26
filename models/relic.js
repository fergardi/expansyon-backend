'use strict'

module.exports = (sequelize, DataTypes) => {
  var Relic = sequelize.define('Relic', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    class: DataTypes.STRING,
    turns: DataTypes.INTEGER,
    skills: DataTypes.INTEGER,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    planet: DataTypes.BOOLEAN,
    ship: DataTypes.BOOLEAN,
    building: DataTypes.BOOLEAN,
    tower: DataTypes.BOOLEAN,
    moon: DataTypes.BOOLEAN,
    station: DataTypes.BOOLEAN,
    store: DataTypes.BOOLEAN,
    aether: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Relic
}
