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
     *
    */
    await queryInterface.bulkInsert('chapters',[
      {
        title: 'Apa itu HTML',
        slug: 'apa-itu-html',
        body: '<h1>Apa itu HTML?</h1>',
        moduleId: 1
      },
      {
        title: 'Kenapa HTML',
        slug: 'kenapa-html',
        body: '<h1>Kenapa HTML?</h1>',
        moduleId: 1
      },
      {
        title: 'Apa itu CSS',
        slug: 'apa-itu-css',
        body: '<h1>Apa itu CSS?</h1>',
        moduleId: 2
      },
      {
        title: 'Apa itu JavaScript',
        slug: 'apa-itu-javascript',
        body: '<h1>Apa itu JavaScript?</h1>',
        moduleId: 3
      },
      {
        title: 'Apa itu React JS',
        slug: 'apa-itu-reactjs',
        body: '<h1>Apa itu React JS?</h1>',
        moduleId: 4
      },
      {
        title: 'Apa itu Express JS',
        slug: 'apa-itu-expressjs',
        body: '<h1>Apa itu Express JS?</h1>',
        moduleId: 5
      },
      {
        title: 'Apa itu TailwindCSS',
        slug: 'apa-itu-tailwindcss',
        body: '<h1>Apa itu TailwindCSS?</h1>',
        moduleId: 6
      },
      {
        title: 'Apa itu Node JS',
        slug: 'apa-itu-node-js',
        body: '<h1>Apa itu Node JS?</h1>',
        moduleId: 7
      },
      {
        title: 'Apa itu API',
        slug: 'apa-itu-api',
        body: '<h1>Apa itu API?</h1>',
        moduleId: 8
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
     await queryInterface.bulkDelete('chapters',[
      {
        title: 'Apa itu HTML',
        slug: 'apa-itu-html',
        body: '<h1>Apa itu HTML?</h1>',
        moduleId: 1
      },
      {
        title: 'Kenapa HTML',
        slug: 'kenapa-html',
        body: '<h1>Kenapa HTML?</h1>',
        moduleId: 1
      },
      {
        title: 'Apa itu CSS',
        slug: 'apa-itu-css',
        body: '<h1>Apa itu CSS?</h1>',
        moduleId: 2
      },
      {
        title: 'Apa itu JavaScript',
        slug: 'apa-itu-javascript',
        body: '<h1>Apa itu JavaScript?</h1>',
        moduleId: 3
      },
      {
        title: 'Apa itu React JS',
        slug: 'apa-itu-reactjs',
        body: '<h1>Apa itu React JS?</h1>',
        moduleId: 4
      },
      {
        title: 'Apa itu Express JS',
        slug: 'apa-itu-expressjs',
        body: '<h1>Apa itu Express JS?</h1>',
        moduleId: 5
      },
      {
        title: 'Apa itu TailwindCSS',
        slug: 'apa-itu-tailwindcss',
        body: '<h1>Apa itu TailwindCSS?</h1>',
        moduleId: 6
      },
      {
        title: 'Apa itu Node JS',
        slug: 'apa-itu-node-js',
        body: '<h1>Apa itu Node JS?</h1>',
        moduleId: 7
      },
      {
        title: 'Apa itu API',
        slug: 'apa-itu-api',
        body: '<h1>Apa itu API?</h1>',
        moduleId: 8
      },
    ],{})
  }
};
