'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('courses_users', [
      {
        userId: 1,
        courseId: 1
      },
      {
        userId: 2,
        courseId: 1
      },
      {
        userId: 1,
        courseId: 2
      },
      {
        userId: 2,
        courseId: 2
      },
      {
        userId: 1,
        courseId: 3
      },
      {
        userId: 2,
        courseId: 3
      },
      {
        userId: 1,
        courseId: 4
      },
      {
        userId: 2,
        courseId: 4
      },
      {
        userId: 1,
        courseId: 5
      },
      {
        userId: 2,
        courseId: 5
      },
      {
        userId: 1,
        courseId: 6
      },
      {
        userId: 2,
        courseId: 6
      },
      {
        userId: 1,
        courseId: 8
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('courses_users', [
      {
        userId: 1,
        courseId: 1
      },
      {
        userId: 2,
        courseId: 1
      },
      {
        userId: 1,
        courseId: 2
      },
      {
        userId: 2,
        courseId: 2
      },
      {
        userId: 1,
        courseId: 3
      },
      {
        userId: 2,
        courseId: 3
      },
      {
        userId: 1,
        courseId: 4
      },
      {
        userId: 2,
        courseId: 4
      },
      {
        userId: 1,
        courseId: 5
      },
      {
        userId: 2,
        courseId: 5
      },
      {
        userId: 1,
        courseId: 6
      },
      {
        userId: 2,
        courseId: 6
      },
      {
        userId: 1,
        courseId: 8
      },
    ])
  }
};
