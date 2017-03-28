'use strict'

module.exports = (sequelize, DataTypes) => {
  var Guild = sequelize.define('Guild', {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' }
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
