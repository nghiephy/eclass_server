'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('comments', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                userId: {
                    type: Sequelize.INTEGER,
                },
                classId: {
                    type: Sequelize.INTEGER,
                },
                postId: {
                    type: Sequelize.INTEGER,
                },
                content: {
                    type: Sequelize.STRING,
                },
                reply: {
                    type: Sequelize.INTEGER,
                },
                isDelete: {
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
                queryInterface.addConstraint('comments', {
                    type: 'FOREIGN KEY',
                    name: 'FK_comments_users',
                    fields: ['userId'],
                    references: {
                        table: 'users',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('comments', {
                    type: 'FOREIGN KEY',
                    name: 'FK_comments_class',
                    fields: ['classId'],
                    references: {
                        table: 'classes',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('comments', {
                    type: 'FOREIGN KEY',
                    name: 'FK_comments_posts',
                    fields: ['postId'],
                    references: {
                        table: 'posts',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('comments');
    },
};
