'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users_Auth extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Users_Auth.belongsTo(models.User, {
                foreignKey: 'userId',
                constraints: true,
            });
        }
    }
    Users_Auth.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Users_Auth',
        },
    );
    return Users_Auth;
};
