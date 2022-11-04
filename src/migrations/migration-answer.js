'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('answers', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                exerciseId: {
                    type: Sequelize.INTEGER,
                },
                content: {
                    type: Sequelize.TEXT,
                },
                correct: {
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
                queryInterface.addConstraint('answers', {
                    type: 'FOREIGN KEY',
                    name: 'FK_answers_exercises',
                    fields: ['exerciseId'],
                    references: {
                        table: 'exercises',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('exercises');
    },
};
