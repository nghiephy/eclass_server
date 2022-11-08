'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('submittings', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                userId: {
                    type: Sequelize.INTEGER,
                },
                answer: {
                    type: Sequelize.TEXT,
                },
                answerChoice: {
                    type: Sequelize.INTEGER,
                },
                exerciseId: {
                    type: Sequelize.INTEGER,
                },
                isMarked: {
                    type: Sequelize.BOOLEAN,
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
                queryInterface.addConstraint('submittings', {
                    type: 'FOREIGN KEY',
                    name: 'FK_submittings_users',
                    fields: ['userId'],
                    references: {
                        table: 'users',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('submittings', {
                    type: 'FOREIGN KEY',
                    name: 'FK_submittings_answers',
                    fields: ['answerChoice'],
                    references: {
                        table: 'answers',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('submittings', {
                    type: 'FOREIGN KEY',
                    name: 'FK_submittings_exercises',
                    fields: ['exerciseId'],
                    references: {
                        table: 'exercises',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('submittings');
    },
};
