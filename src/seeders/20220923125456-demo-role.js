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
            'Roles',
            [
                {
                    key: 'HS',
                    name: 'Học sinh',
                    description: 'Học sinh trong một lớp học',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    key: 'GV',
                    name: 'Giáo viên',
                    description: 'Giáo viên trong một lớp học',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    key: 'TG',
                    name: 'Trợ giảng',
                    description: 'Trợ giảng trong một lớp học',
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
        await queryInterface.bulkDelete('Roles', null, {});
    },
};
