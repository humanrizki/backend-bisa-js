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
    await queryInterface.bulkInsert('modules',[
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 1
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 2
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 3
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 4
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 5
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 6
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 7
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 8
      },
    ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('modules',[
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 1
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 2
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 3
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 4
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 5
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 6
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 7
      },
      {
        title: 'Introduction',
        slug: 'introduction',
        courseId: 8
      },
    ],{})
  }
};
