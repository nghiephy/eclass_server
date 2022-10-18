'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Authorization extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Authorization.belongsTo(models.User, {
                foreignKey: 'userId',
            });
            Authorization.belongsTo(models.Class, {
                foreignKey: 'class',
            });
            Authorization.belongsTo(models.Role, {
                foreignKey: 'role',
                targetKey: 'key',
            });
        }
    }
    Authorization.init(
        {
            userId: DataTypes.INTEGER,
            class: DataTypes.INTEGER,
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'key',
                },
            },
        },
        {
            sequelize,
            modelName: 'Authorization',
        },
    );
    return Authorization;
};
