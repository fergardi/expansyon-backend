'use strict'

module.exports = (sequelize, DataTypes) => {
  var Sale = sequelize.define('Sale', {
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    aether: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    classMethods: {
      associate: (models) => {
        // m2o association
        models.Sale.belongsTo(models.Planet)
        // m2o association
        models.Sale.belongsTo(models.Relic)
        // m2o association
        models.Sale.belongsTo(models.Ship)
      }
    },
    timestamps: true,
    createdAt: 'datetime',
    updatedAt: false,
    freezeTableName: true
  })
  return Sale
}
