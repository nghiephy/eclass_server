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
            'authorizations',
            [
                {
                    userId: 1,
                    class: 1,
                    role: 'GV',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    class: 2,
                    role: 'HS',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 2,
                    class: 1,
                    role: 'HS',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 2,
                    class: 2,
                    role: 'GV',
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
        await queryInterface.bulkDelete('authorizations', null, {});
    },
};
