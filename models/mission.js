'use strict'

module.exports = (sequelize, DataTypes) => {
  var Mission = sequelize.define('Mission', {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    attack: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    defense: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    speed: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    visible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    timestamps: false,
    freezeTableName: true
  })
  return Mission
}
