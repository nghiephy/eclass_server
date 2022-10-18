'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Role.hasMany(models.Authorization, {
                foreignKey: 'role',
            });
        }
    }
    Role.init(
        {
            key: DataTypes.STRING,
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Role',
        },
    );
    return Role;
};
