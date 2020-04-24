'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Orders', 'EventId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Events',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Orders', 'EventId');
  }
};
