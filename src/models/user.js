'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasOne(models.Users_Auth, {
                foreignKey: 'userId',
            });
            User.hasOne(models.Class, {
                foreignKey: 'teacherId',
            });
            User.hasMany(models.Authorization, {
                foreignKey: 'userId',
            });
            User.hasMany(models.Post, {
                foreignKey: 'userId',
            });
            User.hasMany(models.Comment, {
                foreignKey: 'userId',
            });
            User.hasMany(models.Result_Submit, {
                foreignKey: 'userId',
            });
            User.hasMany(models.Private_Comment, {
                foreignKey: 'userId',
            });
        }
    }
    User.init(
        {
            fullName: DataTypes.STRING,
            avatar: DataTypes.STRING,
            email: DataTypes.STRING,
            birthday: DataTypes.DATE,
            googleLogin: DataTypes.STRING,
            locale: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
