'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('result_submits', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                userId: {
                    type: Sequelize.INTEGER,
                },
                postId: {
                    type: Sequelize.INTEGER,
                },
                submitId: {
                    type: Sequelize.INTEGER,
                },
                score: {
                    type: Sequelize.INTEGER,
                },
                comment: {
                    type: Sequelize.TEXT,
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
                queryInterface.addConstraint('result_submits', {
                    type: 'FOREIGN KEY',
                    name: 'FK_result_submits_users',
                    fields: ['userId'],
                    references: {
                        table: 'users',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('result_submits', {
                    type: 'FOREIGN KEY',
                    name: 'FK_result_submits_submittings',
                    fields: ['submitId'],
                    references: {
                        table: 'submittings',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('result_submits', {
                    type: 'FOREIGN KEY',
                    name: 'FK_result_submits_posts',
                    fields: ['postId'],
                    references: {
                        table: 'posts',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('result_submits');
    },
};
