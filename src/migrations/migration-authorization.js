'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('authorizations', {
                userId: {
                    type: Sequelize.INTEGER,
                },
                class: {
                    type: Sequelize.INTEGER,
                },
                role: {
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
                queryInterface.addConstraint('authorizations', {
                    type: 'FOREIGN KEY',
                    name: 'FK_authorization_users',
                    fields: ['userId'],
                    references: {
                        table: 'users',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('authorizations', {
                    type: 'FOREIGN KEY',
                    name: 'FK_authorization_classes',
                    fields: ['class'],
                    references: {
                        table: 'classes',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('authorizations', {
                    type: 'FOREIGN KEY',
                    name: 'FK_authorization_roles',
                    fields: ['role'],
                    references: {
                        table: 'roles',
                        field: 'key',
                    },
                });
                queryInterface.sequelize.query(
                    'ALTER TABLE authorizations ADD CONSTRAINT authorizations_pk PRIMARY KEY (userId, class)',
                );
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('authorizations');
    },
};
