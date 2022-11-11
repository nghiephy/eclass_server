'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Result_Submit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Result_Submit.belongsTo(models.User, {
                foreignKey: 'userId',
            });
            Result_Submit.belongsTo(models.Post, {
                foreignKey: 'postId',
            });
            Result_Submit.belongsTo(models.Submitting, {
                foreignKey: 'submitId',
            });
        }
    }
    Result_Submit.init(
        {
            userId: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
            submitId: DataTypes.INTEGER,
            score: DataTypes.INTEGER,
            comment: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Result_Submit',
        },
    );
    return Result_Submit;
};
