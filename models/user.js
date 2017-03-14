'use strict'

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return User
}
