'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('submit_files', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                submitId: {
                    type: Sequelize.INTEGER,
                },
                name: {
                    type: Sequelize.STRING,
                },
                type: {
                    type: Sequelize.STRING,
                },
                url: {
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
                queryInterface.addConstraint('submit_files', {
                    type: 'FOREIGN KEY',
                    name: 'FK_submit_files_submittings',
                    fields: ['submitId'],
                    references: {
                        table: 'submittings',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('submit_files');
    },
};
