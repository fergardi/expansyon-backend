'use strict'

module.exports = (sequelize, DataTypes) => {
  var Battle = sequelize.define('Battle', {
  }, {
    classMethods: {
      associate: (models) => {
        // m2o association
        models.Battle.belongsTo(models.Mission)
        // m2o association
        models.Battle.belongsTo(models.Planet)
        // m2o association
        models.Battle.belongsTo(models.Player)
        // m2m association
        var BattleShip = sequelize.define('BattleShip', {
          quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Ship.belongsToMany(models.Battle, { through: BattleShip })
        models.Battle.belongsToMany(models.Ship, { through: BattleShip })
      }
    },
    timestamps: true,
    createdAt: 'begin',
    updatedAt: 'end',
    freezeTableName: true
  })
  return Battle
}
