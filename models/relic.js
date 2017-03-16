'use strict'

module.exports = (sequelize, DataTypes) => {
  var Relic = sequelize.define('Relic', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    class: DataTypes.STRING,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    planet: DataTypes.BOOLEAN,
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
