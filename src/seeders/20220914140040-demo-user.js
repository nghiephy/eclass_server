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
            'Users',
            [
                {
                    fullName: 'Nguyen Nghiep',
                    avatar: '/img/avatar/example_avatar.jpg',
                    email: 'nghiep@gmail.com',
                    birthday: new Date(),
                    googleLogin: '12345',
                    locale: 'Vi',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    fullName: 'Hai Yen',
                    avatar: '/img/avatar/example_avatar.jpg',
                    email: 'haiyen@gmail.com',
                    birthday: new Date(),
                    googleLogin: null,
                    locale: 'Vi',
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
        await queryInterface.bulkDelete('Users', null, {});
    },
};
