'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('takes', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                userId: {
                    type: Sequelize.INTEGER,
                },
                examId: {
                    type: Sequelize.INTEGER,
                },
                status: {
                    type: Sequelize.BOOLEAN,
                },
                score: {
                    type: Sequelize.FLOAT,
                },
                isReviewed: {
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
                queryInterface.addConstraint('takes', {
                    type: 'FOREIGN KEY',
                    name: 'FK_takes_exams',
                    fields: ['examId'],
                    references: {
                        table: 'exams',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('takes', {
                    type: 'FOREIGN KEY',
                    name: 'FK_takes_users',
                    fields: ['userId'],
                    references: {
                        table: 'users',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('takes');
    },
};
