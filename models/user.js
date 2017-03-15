'use strict'

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // o2o relationship
        models.User.belongsTo(models.Player)
        models.Player.hasOne(models.User)
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return User
}
