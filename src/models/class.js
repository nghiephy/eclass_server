'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Class.hasMany(models.Authorization, {
                foreignKey: 'class',
            });
            Class.hasMany(models.Topic, {
                foreignKey: 'classId',
            });
            Class.hasMany(models.Post, {
                foreignKey: 'class',
            });
            Class.hasMany(models.Comment, {
                foreignKey: 'classId',
            });
            Class.belongsTo(models.User, {
                foreignKey: 'teacherId',
            });
        }
    }
    Class.init(
        {
            teacherId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            topic: DataTypes.STRING,
            semester: DataTypes.STRING,
            room: DataTypes.STRING,
            enrollKey: DataTypes.STRING,
            isBlockKey: DataTypes.BOOLEAN,
            isHiddenKey: DataTypes.BOOLEAN,
            coverImg: DataTypes.STRING,
            primaryColor: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Class',
        },
    );
    return Class;
};
