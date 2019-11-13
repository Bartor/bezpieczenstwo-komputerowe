'use strict';

const uuidv4 = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4,
        },
        firstName: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        },
        salt: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
    }, {});
    User.associate = function (models) {
    };
    return User;
};