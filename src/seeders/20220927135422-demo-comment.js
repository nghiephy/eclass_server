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
            'comments',
            [
                {
                    userId: 1,
                    postId: 1,
                    content: 'Cám ơn thầy!',
                    isDelete: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    postId: 1,
                    content: 'Có làm hết bài tập luôn không ạ?',
                    reply: 1,
                    isDelete: false,
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
        await queryInterface.bulkDelete('comments', null, {});
    },
};
