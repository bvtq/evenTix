'use strict';

const { encrypt } = require("../helper/bcrypt");

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;
  class User extends Model {

    getFullName() {
      return [this.first_name, this.last_name].join(' ');
    }
  }

  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        NotEmpty() {
          if (this.email == "") {
            throw new Error('Email cannot be empty')
          }
        }
      }
    },
    phone_number: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        NotEmpty() {
          if (this.password == "") {
            throw new Error('Password cannot be empty')
          }
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = encrypt(user.password)
        if (!User.last_name) {
          User.last_name = User.first_name
        }
      }
    },
    sequelize
  })

  User.associate = function (models) {
    User.belongsToMany(models.Event, { through: 'Orders' })
  };
  return User;
};