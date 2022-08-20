'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          notEmpty: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      underscored:true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};