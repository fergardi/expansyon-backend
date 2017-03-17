'use strict'

module.exports = (sequelize, DataTypes) => {
  var Guild = sequelize.define('Guild', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // o2m association
        models.Guild.hasMany(models.Player)
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Guild
}
