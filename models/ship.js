'use strict'

module.exports = (sequelize, DataTypes) => {
  var Ship = sequelize.define('Ship', {
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    description: DataTypes.STRING,
    class: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Ship
}
