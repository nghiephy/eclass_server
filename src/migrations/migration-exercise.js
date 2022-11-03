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
                topicId: {
                    type: Sequelize.INTEGER,
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
                queryInterface.addConstraint('exercises', {
                    type: 'FOREIGN KEY',
                    name: 'FK_exercises_topics',
                    fields: ['topicId'],
                    references: {
                        table: 'topics',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('exercises');
    },
};
