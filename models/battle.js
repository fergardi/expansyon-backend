'use strict'

module.exports = (sequelize, DataTypes) => {
  var Battle = sequelize.define('Battle', {
  }, {
    classMethods: {
      associate: (models) => {
        // m2o association
        models.Battle.belongsTo(models.Player, { as: 'From', foreignKey: 'FromId' })
        // m2o association
        models.Battle.belongsTo(models.Player, { as: 'To', foreignKey: 'ToId' })
        // m2m association
        var BattleShip = sequelize.define('BattleShip', {
          quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
          }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Ship.belongsToMany(models.Battle, { through: BattleShip })
        models.Battle.belongsToMany(models.Ship, { through: BattleShip })
      }
    },
    timestamps: true,
    createdAt: 'start',
    updatedAt: 'end',
    freezeTableName: true
  })
  return Battle
}
