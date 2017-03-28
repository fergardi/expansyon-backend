'use strict'

module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    subject: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    text: { type: DataTypes.STRING, allowNull: false, defaultValue: '' }
  }, {
    classMethods: {
      associate: (models) => {
        // m2o bidirectional association
        models.Player.hasMany(models.Message, { as: 'Sent', foreignKey: 'FromId' })
        models.Message.belongsTo(models.Player, { as: 'From', foreignKey: 'FromId' })
        // m2o bidirectional association
        models.Player.hasMany(models.Message, { as: 'Received', foreignKey: 'ToId' })
        models.Message.belongsTo(models.Player, { as: 'To', foreignKey: 'ToId' })
      }
    },
    timestamps: true,
    updatedAt: false,
    createdAt: 'datetime',
    freezeTableName: true
  })
  return Message
}
