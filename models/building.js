'use strict'

module.exports = (sequelize, DataTypes) => {
  var Building = sequelize.define('Building', {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    energy: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    shield: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    storage: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Building
}
