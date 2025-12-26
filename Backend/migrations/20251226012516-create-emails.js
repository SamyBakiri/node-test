'use strict';
// npx sequelize-cli db:migrate
// 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('emails', {
      id:{type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      userId:{type: Sequelize.INTEGER, allowNull: false}, // sender
      toEmail: { // receiver (@email)
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
          isEmail: true,
          },
      },
      title: { 
          type: Sequelize.STRING,
          allowNull: false,
      },
      body: { // emails inner text
          type: Sequelize.TEXT,
          allowNull: false,
      },
      status: { 
          type: Sequelize.ENUM('pending', 'sent', 'failed'),
          defaultValue: 'pending',
      },
      scheduledAt: {
          type: Sequelize.DATE,
          allowNull: true,
      },
      sentAt: {
          type: Sequelize.DATE,
          allowNull: true,
      },
    });
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('emails');
  }
};
