'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('posts', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                userId: {
                    type: Sequelize.INTEGER,
                },
                class: {
                    type: Sequelize.INTEGER,
                },
                content: {
                    type: Sequelize.TEXT,
                },
                type: {
                    type: Sequelize.STRING,
                },
                isHidden: {
                    type: Sequelize.BOOLEAN,
                },
                isDelete: {
                    type: Sequelize.BOOLEAN,
                },
                isCompleted: {
                    type: Sequelize.BOOLEAN,
                },
                deadline: {
                    allowNull: true,
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
                queryInterface.addConstraint('posts', {
                    type: 'FOREIGN KEY',
                    name: 'FK_posts_users',
                    fields: ['userId'],
                    references: {
                        table: 'users',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('posts', {
                    type: 'FOREIGN KEY',
                    name: 'FK_posts_classes',
                    fields: ['class'],
                    references: {
                        table: 'classes',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('posts', {
                    type: 'FOREIGN KEY',
                    name: 'FK_posts_types',
                    fields: ['type'],
                    references: {
                        table: 'post_types',
                        field: 'key',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('posts');
    },
};
