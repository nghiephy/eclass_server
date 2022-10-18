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
            'Classes',
            [
                {
                    teacherId: 1,
                    name: 'Javascrip Cơ Bản',
                    topic: 'Ngôn ngữ lập trình',
                    semester: 'HK2 2022-2023',
                    room: '102-B1',
                    enrollKey: '123ABC',
                    coverImg: '/',
                    primaryColor: 'blue',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    teacherId: 2,
                    name: 'Tập huấn giảng dạy',
                    topic: 'Tập huấn',
                    semester: 'HK2 2022-2023',
                    room: '102-B2',
                    enrollKey: '124ABC',
                    coverImg: '/',
                    primaryColor: 'blue',
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
        await queryInterface.bulkDelete('Classes', null, {});
    },
};
