'use strict'

module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    turns: DataTypes.INTEGER,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    aether: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Player
}
