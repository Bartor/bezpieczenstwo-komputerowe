'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id : {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(31),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(31),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING(63),
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING(63),
      allowNull: false
    },
  }, {});
  User.associate = function(models) {
  };
  return User;
};