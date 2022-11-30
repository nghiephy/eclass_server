'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('exams', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                postId: {
                    type: Sequelize.INTEGER,
                },
                title: {
                    type: Sequelize.STRING,
                },
                guide: {
                    type: Sequelize.TEXT,
                },
                password: {
                    type: Sequelize.STRING,
                },
                maxScore: {
                    type: Sequelize.INTEGER,
                },
                totalQuestion: {
                    type: Sequelize.INTEGER,
                },
                isBlock: {
                    type: Sequelize.BOOLEAN,
                },
                requirePass: {
                    type: Sequelize.BOOLEAN,
                },
                startedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                finishedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            })
            .then(() => {
                queryInterface.addConstraint('exams', {
                    type: 'FOREIGN KEY',
                    name: 'FK_exams_posts',
                    fields: ['postId'],
                    references: {
                        table: 'posts',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('exams');
    },
};
