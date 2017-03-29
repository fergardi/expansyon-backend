'use strict'

module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define('Player', {
    email: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    password: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    turns: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    experience: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    level: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    aether: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
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
        // o2m bidirectional association
        models.Player.hasMany(models.Sale)
        models.Sale.belongsTo(models.Player)
        // m2m association
        var PlayerRelic = sequelize.define('PlayerRelic', {
          quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Relic.belongsToMany(models.Player, { through: PlayerRelic })
        models.Player.belongsToMany(models.Relic, { through: PlayerRelic })
        // m2m association
        var PlayerShip = sequelize.define('PlayerShip', {
          quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Ship.belongsToMany(models.Player, { through: PlayerShip })
        models.Player.belongsToMany(models.Ship, { through: PlayerShip })
        // m2m association
        var PlayerBuilding = sequelize.define('PlayerBuilding', {
          quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Building.belongsToMany(models.Player, { through: PlayerBuilding })
        models.Player.belongsToMany(models.Building, { through: PlayerBuilding })
        // m2m association
        var PlayerTower = sequelize.define('PlayerTower', {
          quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Tower.belongsToMany(models.Player, { through: PlayerTower })
        models.Player.belongsToMany(models.Tower, { through: PlayerTower })
        // m2m association
        var PlayerAchievement = sequelize.define('PlayerAchievement', {
        }, {
          timestamps: true,
          updatedAt: false,
          createdAt: 'datetime',
          freezeTableName: true
        })
        models.Achievement.belongsToMany(models.Player, { through: PlayerAchievement })
        models.Player.belongsToMany(models.Achievement, { through: PlayerAchievement })
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Player
}
