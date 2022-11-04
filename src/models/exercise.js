'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Exercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Exercise.belongsTo(models.Post, {
                foreignKey: 'postId',
            });
        }
    }
    Exercise.init(
        {
            postId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            guide: DataTypes.TEXT,
            maxScore: DataTypes.INTEGER,
            isBlock: DataTypes.BOOLEAN,
            typeExe: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Exercise',
        },
    );
    return Exercise;
};
