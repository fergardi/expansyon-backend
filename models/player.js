'use strict'

module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define('Player', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    turns: DataTypes.INTEGER,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    aether: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // m2o association
        models.Player.belongsTo(models.Guild)
        // m2o association
        models.Player.belongsTo(models.Faction)
        // o2m association
        models.Player.hasMany(models.Planet)
        // o2m bidirectional association
        models.Player.hasMany(models.Message, { as: 'Sent', foreignKey: 'FromId' })
        models.Message.belongsTo(models.Player, { as: 'From', foreignKey: 'FromId' })
        // o2m bidirectional association
        models.Player.hasMany(models.Message, { as: 'Received', foreignKey: 'ToId' })
        models.Message.belongsTo(models.Player, { as: 'To', foreignKey: 'ToId' })
        // m2m association
        var PlayerRelic = sequelize.define('PlayerRelic', {
          quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
          }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Relic.belongsToMany(models.Player, {through: PlayerRelic})
        models.Player.belongsToMany(models.Relic, {through: PlayerRelic})
        // m2m association
        var PlayerShip = sequelize.define('PlayerShip', {
          quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
          }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Ship.belongsToMany(models.Player, {through: PlayerShip})
        models.Player.belongsToMany(models.Ship, {through: PlayerShip})
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Player
}
