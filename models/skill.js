'use strict'

module.exports = (sequelize, DataTypes) => {
  var Skill = sequelize.define('Skill', {
    // general info
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    class: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    tree: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    min: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    max: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    // bonuses
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    size: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    energy: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    nano: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    attack: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    defense: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    speed: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    aim: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    evasion: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    experience: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    counter: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    exploration: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    cargo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    storage: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    fighter: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    cruiser: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    bomber: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    orbiter: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    recycler: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    carrier: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    furnace: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    factory: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    refinery: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    plant: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    barrier: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    warehouse: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    blaster: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    railgun: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    cannon: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    classMethods: {
      associate: (models) => {
        // m2o self referencing association
        models.Skill.hasMany(models.Skill, { as: 'children', foreignKey: 'parentId' })
        // o2m self referencing association
        models.Skill.belongsTo(models.Skill, { as: 'parent', foreignKey: 'parentId' })
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Skill
}
