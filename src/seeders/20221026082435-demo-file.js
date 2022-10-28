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
            'files',
            [
                {
                    postId: 1,
                    name: 'Hình hoa mặt trời',
                    url: '/files/post/sunflower.jpg',
                    type: 'image',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    postId: 2,
                    name: 'Tài liệu tiếng anh',
                    url: '/files/post/english.pdf',
                    type: 'pdf',
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
        await queryInterface.bulkDelete('files', null, {});
    },
};
