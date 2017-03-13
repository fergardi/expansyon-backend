'use strict'

module.exports = (sequelize, DataTypes) => {
  var Building = sequelize.define('Building', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    class: DataTypes.STRING,
    image: DataTypes.STRING,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Building
}
