'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('exam_answers', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                examId: {
                    type: Sequelize.INTEGER,
                },
                exquesId: {
                    type: Sequelize.INTEGER,
                },
                correct: {
                    type: Sequelize.BOOLEAN,
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
                queryInterface.addConstraint('exam_answers', {
                    type: 'FOREIGN KEY',
                    name: 'FK_exam_answers_exams',
                    fields: ['examId'],
                    references: {
                        table: 'exams',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('exam_answers', {
                    type: 'FOREIGN KEY',
                    name: 'FK_exam_answers_exam_questions',
                    fields: ['exquesId'],
                    references: {
                        table: 'exam_questions',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('exam_answers');
    },
};
