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
    await queryInterface.bulkInsert('courses',[
      {
        title: 'HTML',
        image: '/img/html.png',
        slug: 'html',
        description: 'HTML'
      },
      {
        title: 'CSS',
        image: '/img/css.png',
        slug: 'css',
        description: 'CSS'
      },
      {
        title: 'JavaScript',
        image: '/img/js.png',
        slug: 'js',
        description: 'JavaScript'
      },
      {
        title: 'React JS',
        image: '/img/react.png',
        slug: 'react-js',
        description: 'React JS'
      },
      {
        title: 'Express JS',
        image: '/img/express.png',
        slug: 'express-js',
        description: 'Express JS'
      },
      {
        title: 'TailwindCSS',
        image: '/img/tailwindcss.png',
        slug: 'tailwindcss',
        description: 'TailwindCSS'
      },
      {
        title: 'Node JS',
        image: '/img/nodejs.png',
        slug: 'node-js',
        description: 'Node JS'
      },
      {
        title: 'API',
        image: '/img/api.png',
        slug: 'api',
        description: 'API'
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
    await queryInterface.bulkDelete('courses',[
      {
        title: 'HTML',
        image: '/img/html.png',
        slug: 'html',
        description: 'HTML'
      },
      {
        title: 'CSS',
        image: '/img/css.png',
        slug: 'css',
        description: 'CSS'
      },
      {
        title: 'JavaScript',
        image: '/img/js.png',
        slug: 'js',
        description: 'JavaScript'
      },
      {
        title: 'React JS',
        image: '/img/react.png',
        slug: 'react-js',
        description: 'React JS'
      },
      {
        title: 'Express JS',
        image: '/img/express.png',
        slug: 'express-js',
        description: 'Express JS'
      },
      {
        title: 'TailwindCSS',
        image: '/img/tailwindcss.png',
        slug: 'html',
        description: 'TailwindCSS'
      },
      {
        title: 'Node JS',
        image: '/img/nodejs.png',
        slug: 'node-js',
        description: 'Node JS'
      },
      {
        title: 'API',
        image: '/img/api.png',
        slug: 'api',
        description: 'API'
      },
    ],{})
  }
};
