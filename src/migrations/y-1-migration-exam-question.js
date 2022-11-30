'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('exam_questions', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                examId: {
                    type: Sequelize.INTEGER,
                },
                question: {
                    type: Sequelize.STRING,
                },
                active: {
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
                queryInterface.addConstraint('exam_questions', {
                    type: 'FOREIGN KEY',
                    name: 'FK_exam_questions_exams',
                    fields: ['examId'],
                    references: {
                        table: 'exams',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('exam_questions');
    },
};
