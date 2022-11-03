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
            'exercises',
            [
                {
                    postId: 4,
                    title: 'Bài tập chương 2 cơ bản',
                    guide: 'Các em xem tài liệu và làm bài tập trang 17 nhé!',
                    topicId: 2,
                    maxScore: 100,
                    isBlock: false,
                    typeExe: 'text',
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
        await queryInterface.bulkDelete('exercises', null, {});
    },
};
