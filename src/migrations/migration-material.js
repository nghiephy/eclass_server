'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('materials', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                postId: {
                    type: Sequelize.INTEGER,
                },
                title: {
                    type: Sequelize.STRING,
                },
                guide: {
                    type: Sequelize.TEXT,
                },
                topicId: {
                    type: Sequelize.INTEGER,
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
                queryInterface.addConstraint('materials', {
                    type: 'FOREIGN KEY',
                    name: 'FK_materials_posts',
                    fields: ['postId'],
                    references: {
                        table: 'posts',
                        field: 'id',
                    },
                });
                queryInterface.addConstraint('materials', {
                    type: 'FOREIGN KEY',
                    name: 'FK_materials_topics',
                    fields: ['topicId'],
                    references: {
                        table: 'topics',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('materials');
    },
};
