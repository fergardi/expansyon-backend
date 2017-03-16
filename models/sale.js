'use strict'

module.exports = (sequelize, DataTypes) => {
  var Sale = sequelize.define('Sale', {
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    aether: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // m2o association
        models.Sale.belongsTo(models.Planet)
        // m2o association
        models.Sale.belongsTo(models.Artifact)
        // m2o association
        models.Sale.belongsTo(models.Ship)
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Sale
}
