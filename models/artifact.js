'use strict'

module.exports = (sequelize, DataTypes) => {
  var Artifact = sequelize.define('Artifact', {
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    planet: DataTypes.BOOLEAN,
    moon: DataTypes.BOOLEAN,
    station: DataTypes.BOOLEAN,
    store: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    class: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Artifact
}
