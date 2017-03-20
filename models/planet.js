'use strict'

module.exports = (sequelize, DataTypes) => {
  var Planet = sequelize.define('Planet', {
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    class: DataTypes.STRING,
    image: DataTypes.STRING,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    energy: DataTypes.INTEGER,
    influence: DataTypes.INTEGER,
    moon: DataTypes.BOOLEAN,
    station: DataTypes.BOOLEAN,
    visible: DataTypes.BOOLEAN
  }, {
    getterMethods: {
      name () {
        return this.type + ' ' + (this.metal + this.crystal + this.oil + this.size + this.energy + this.influence)
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Planet
}
