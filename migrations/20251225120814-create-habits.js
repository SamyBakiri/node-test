'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('habits', {
      id:{type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      name:{type: Sequelize.STRING, allowNull: false},
      description:{type: Sequelize.STRING, allowNull: true},
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }

    });
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('habits');
  }
};
