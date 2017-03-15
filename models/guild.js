'use strict'

module.exports = (sequelize, DataTypes) => {
  var Guild = sequelize.define('Guild', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Guild
}
