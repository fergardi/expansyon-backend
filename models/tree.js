'use strict'

module.exports = (sequelize, DataTypes) => {
  var Tree = sequelize.define('Tree', {
    // general info
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' }
  }, {
    classMethods: {
      associate: (models) => {
        // o2m association
        models.Tree.hasMany(models.Skill)
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Tree
}
