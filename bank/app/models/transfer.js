'use strict';

const uuidv4 = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
    const Transfer = sequelize.define('Transfer', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4,
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: 'Transfer'
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
            allowNull: false,
            min: 0
        },
        datetime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['accepted', 'cancelled', 'pending'],
            defaultValue: 'pending',
            allowNull: false
        }
    }, {});
    Transfer.associate = function (models) {
        Transfer.belongsTo(models.User, {foreignKey: 'sender', targetKey: 'id'});
        Transfer.belongsTo(models.User, {foreignKey: 'receiver', targetKey: 'id'});
    };
    return Transfer;
};