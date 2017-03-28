'use strict'

module.exports = (sequelize, DataTypes) => {
  var Achievement = sequelize.define('Achievement', {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    planetarium: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    hangar: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    infrastructure: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    level: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    moon: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    station: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Achievement
}
