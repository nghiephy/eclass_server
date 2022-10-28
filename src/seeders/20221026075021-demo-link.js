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
            'links',
            [
                {
                    postId: 1,
                    title: 'Hướng dẫn code',
                    url: 'https://www.youtube.com/watch?v=sjAeLwuezxo&t=5s',
                    image: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    postId: 2,
                    title: 'Link demo sản phẩm',
                    url: 'http://localhost:3002/stream/1',
                    image: '',
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
        await queryInterface.bulkDelete('links', null, {});
    },
};
