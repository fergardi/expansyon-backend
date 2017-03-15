'use strict'

module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    turns: DataTypes.INTEGER,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    aether: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // m2o association
        models.Player.belongsTo(models.Faction)
        // m2m association
        var PlayerPlanet = sequelize.define('PlayerPlanet', {
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Planet.belongsToMany(models.Player, {through: PlayerPlanet})
        models.Player.belongsToMany(models.Planet, {through: PlayerPlanet})
        // custom m2m association with "quantity" to count ammount of resources of the same type
        var PlayerArtifact = sequelize.define('PlayerArtifact', {
          quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
          }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Artifact.belongsToMany(models.Player, {through: PlayerArtifact})
        models.Player.belongsToMany(models.Artifact, {through: PlayerArtifact})
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Player
}
