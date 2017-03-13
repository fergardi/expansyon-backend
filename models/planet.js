'use strict'

module.exports = (sequelize, DataTypes) => {
  var Planet = sequelize.define('Planet', {
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
    moon: DataTypes.BOOLEAN,
    station: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Planet
}
