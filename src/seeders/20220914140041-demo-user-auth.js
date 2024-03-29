'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'users_auths',
            [
                {
                    username: 'nghiephy',
                    password: '$2a$10$HXs8X0HPBvUeal/sMbgNHe4KhcA7I2eHSpX9GEW6zsR05f1bRUjwO',
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'haiyenln',
                    password: '$2a$10$HXs8X0HPBvUeal/sMbgNHe4KhcA7I2eHSpX9GEW6zsR05f1bRUjwO',
                    userId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users_auths', null, {});
    },
};
