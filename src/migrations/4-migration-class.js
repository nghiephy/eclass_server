'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable('classes', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                teacherId: {
                    type: Sequelize.INTEGER,
                },
                name: {
                    type: Sequelize.STRING,
                },
                topic: {
                    type: Sequelize.STRING,
                },
                semester: {
                    type: Sequelize.STRING,
                },
                room: {
                    type: Sequelize.STRING,
                },
                enrollKey: {
                    unique: true,
                    type: Sequelize.STRING,
                },
                isBlockKey: {
                    defaultValue: false,
                    type: Sequelize.BOOLEAN,
                },
                isHiddenKey: {
                    defaultValue: false,
                    type: Sequelize.BOOLEAN,
                },
                isDeleted: {
                    defaultValue: false,
                    type: Sequelize.BOOLEAN,
                },
                coverImg: {
                    type: Sequelize.STRING,
                },
                primaryColor: {
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
                queryInterface.addConstraint('classes', {
                    type: 'FOREIGN KEY',
                    name: 'FK_classes_users',
                    fields: ['teacherId'],
                    references: {
                        table: 'users',
                        field: 'id',
                    },
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('classes');
    },
};
