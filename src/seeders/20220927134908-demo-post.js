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
            'posts',
            [
                {
                    userId: 1,
                    class: 1,
                    content: 'Thông báo lớp chúng ta được nghỉ một ngày hôm nay nhé!',
                    type: 'TB',
                    isHidden: false,
                    isDelete: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    class: 1,
                    content: 'Cả lớp hoàn thành bài tập của ngày nghỉ hôm nay nhé!',
                    type: 'TB',
                    isHidden: false,
                    isDelete: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    class: 1,
                    content: 'Tài liệu chương 2',
                    type: 'TL',
                    isHidden: false,
                    isDelete: false,
                    isCompleted: false,
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
        await queryInterface.bulkDelete('posts', null, {});
    },
};
