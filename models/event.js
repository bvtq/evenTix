'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;
  class Event extends Model { }

  Event.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    price: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize
  })

  Event.associate = function (models) {
    Event.belongsToMany(models.User, { through: 'Orders' })
  };
  return Event;
};