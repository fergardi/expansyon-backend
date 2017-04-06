'use strict'

module.exports = (sequelize, DataTypes) => {
  var Planet = sequelize.define('Planet', {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    size: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    energy: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    influence: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    moon: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    station: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    visible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    main: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    getterMethods: {
      total () {
        return this.metal + this.crystal + this.oil + this.size + this.energy + this.influence
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Planet
}
