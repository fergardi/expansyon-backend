'use strict'

module.exports = (sequelize, DataTypes) => {
  var Ship = sequelize.define('Ship', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    class: DataTypes.STRING,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Ship
}
