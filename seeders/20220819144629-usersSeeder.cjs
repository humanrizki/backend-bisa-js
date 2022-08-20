'use strict';
const argon2 = require('argon2')
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
    const password = await argon2.hash('password')
    await queryInterface.bulkInsert('users', [
      {
        name: 'MUHAMMAD RIZKI',
        email: 'humanrizki123@gmail.com',
        username: 'humanrizki',
        password: password,
        roleId: 1
      },
      {
        name: 'Dimas Prasetyo',
        email: 'dp_ras@gmail.com',
        username: 'dp_ras',
        password: password,
        roleId: 1
      },
      {
        name: 'Ucup Surucup',
        email: 'ucup@gmail.com',
        username: 'ucup',
        password: password,
        roleId: 2
      },
      {
        name: 'Otong Surotong',
        email: 'otong@gmail.com',
        username: 'otong',
        password: password,
        roleId: 2
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
    const password = await argon2.hash('password')
    await queryInterface.bulkDelete('users', [
      {
        name: 'MUHAMMAD RIZKI',
        email: 'humanrizki123@gmail.com',
        username: 'humanrizki',
        password: password,
        roleId: 1
      },
      {
        name: 'Dimas Prasetyo',
        email: 'dp_ras@gmail.com',
        username: 'dp_ras',
        password: password,
        roleId: 1
      },
      {
        name: 'Ucup Surucup',
        email: 'ucup@gmail.com',
        username: 'ucup',
        password: password,
        roleId: 2
      },
      {
        name: 'Otong Surotong',
        email: 'otong@gmail.com',
        username: 'otong',
        password: password,
        roleId: 2
      },
    ])
  }
};
