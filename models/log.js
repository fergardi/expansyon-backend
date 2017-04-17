'use strict'

module.exports = (sequelize, DataTypes) => {
  var Log = sequelize.define('Log', {
    // general info
    level: { type: DataTypes.STRING(16), allowNull: false, defaultValue: '' },
    message: { type: DataTypes.STRING(2048), allowNull: false, defaultValue: '' },
    meta: { type: DataTypes.STRING(2048), allowNull: false, defaultValue: '' },
    // special timestamp field used by winston mysql logger
    timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() }
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Log
}
