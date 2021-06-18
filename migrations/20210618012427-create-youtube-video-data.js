'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('YoutubeVideoData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
	title: {
	    allowNull: false,
        type: Sequelize.STRING
      },
	description: {
	    allowNull: false,
        type: Sequelize.STRING
      },
	channelTitle: {
	    allowNull: false,
        type: Sequelize.STRING
      },
	publishedAt: {
	    allowNull: false,
        type: Sequelize.DATE
      },
	publishedTime: {
	    allowNull: false,
        type: Sequelize.DATE
      },
	thunbnailUrl: {
	    allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('YoutubeVideoData');
  }
};

