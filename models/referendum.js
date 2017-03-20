'use strict'

module.exports = (sequelize, DataTypes) => {
  var Referendum = sequelize.define('Referendum', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    class: DataTypes.STRING,
    image: DataTypes.STRING,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    energy: DataTypes.INTEGER,
    influence: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    aether: DataTypes.INTEGER,
    visible: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Referendum
}
