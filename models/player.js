'use strict'

module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define('Player', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
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
        // m2o association
        models.Player.hasMany(models.Message, { as: 'Sent', foreignKey: 'FromId' })
        models.Message.belongsTo(models.Player, { as: 'From', foreignKey: 'FromId' })
        // m2o association
        models.Player.hasMany(models.Message, { as: 'Received', foreignKey: 'ToId' })
        models.Message.belongsTo(models.Player, { as: 'To', foreignKey: 'ToId' })
        // custom m2m association with "quantity" to count ammount of resources of the same type
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
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Player
}
