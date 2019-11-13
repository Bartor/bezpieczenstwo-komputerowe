'use strict';
module.exports = (sequelize, DataTypes) => {
    const Transfer = sequelize.define('Transfer', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        sender: {
            type: DataTypes.UUID,
            allowNull: false
        },
        receiver: {
            type: DataTypes.UUID,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            min: 0
        }
    }, {});
    Transfer.associate = function (models) {
        Transfer.belongsTo(models.User, {foreignKey: 'sender', targetKey: 'id'});
        Transfer.belongsTo(models.User, {foreignKey: 'receiver', targetKey: 'id'});
    };
    return Transfer;
};