'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;
  class Order extends Model { }

  Order.init({
    quantity: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  }, {
    sequelize
  })

  Order.associate = function (models) {
    Order.belongsTo(models.User)
    Order.belongsTo(models.Event)
  };
  return Order;
};