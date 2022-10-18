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
            'post_types',
            [
                {
                    key: 'TB',
                    name: 'Thông báo',
                    description: 'Thông báo trong một lớp học',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    key: 'BT',
                    name: 'Bài tập',
                    description: 'Bài tập trong một lớp học',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    key: 'TL',
                    name: 'Tài liệu',
                    description: 'Tài liệu trong một lớp học',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    key: 'KT',
                    name: 'Kiểm tra',
                    description: 'Bài kiểm tra trong một lớp học',
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
        await queryInterface.bulkDelete('post_types', null, {});
    },
};
