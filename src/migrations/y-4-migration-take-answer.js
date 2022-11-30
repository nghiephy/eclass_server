'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('take_answers', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                takeId: {
                    type: Sequelize.INTEGER,
                },
                exquesId: {
                    type: Sequelize.INTEGER,
                },
                exanswerId: {
                    type: Sequelize.INTEGER,
                },
                content: {
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
                queryInterface.addConstraint('take_answers', {
                    type: 'FOREIGN KEY',
                    name: 'FK_take_answers_takes',
                    fields: ['takeId'],
                    references: {
                        table: 'takes',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('take_answers', {
                    type: 'FOREIGN KEY',
                    name: 'FK_take_answers_exam_questions',
                    fields: ['exquesId'],
                    references: {
                        table: 'exam_questions',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('take_answers', {
                    type: 'FOREIGN KEY',
                    name: 'FK_take_answers_exam_answers',
                    fields: ['exanswerId'],
                    references: {
                        table: 'exam_answers',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('take_answers');
    },
};
