'use strict'

module.exports = (sequelize, DataTypes) => {
  var Tower = sequelize.define('Tower', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    class: DataTypes.STRING,
    image: DataTypes.STRING,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    speed: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Tower
}
