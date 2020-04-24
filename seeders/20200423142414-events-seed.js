'use strict';

const data = require('../seed-data/events.json')
const events = data.map(event => {
  event.createdAt = new Date()
  event.updatedAt = new Date()
  return event
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', events, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
