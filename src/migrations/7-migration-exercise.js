'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('exercises', {
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
                maxScore: {
                    type: Sequelize.INTEGER,
                },
                isBlock: {
                    type: Sequelize.BOOLEAN,
                },
                typeExe: {
                    type: Sequelize.STRING,
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
                queryInterface.addConstraint('exercises', {
                    type: 'FOREIGN KEY',
                    name: 'FK_exercises_posts',
                    fields: ['postId'],
                    references: {
                        table: 'posts',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('exercises');
    },
};