'use strict'

module.exports = (sequelize, DataTypes) => {
  var Mission = sequelize.define('Mission', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    class: DataTypes.STRING,
    image: DataTypes.STRING,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Mission
}
