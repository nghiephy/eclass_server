'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Take extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Take.hasMany(models.Take_Answer, {
                foreignKey: 'takeId',
            });
            Take.belongsTo(models.Exam, {
                foreignKey: 'examId',
            });
            Take.belongsTo(models.User, {
                foreignKey: 'userId',
            });
        }
    }
    Take.init(
        {
            userId: DataTypes.INTEGER,
            examId: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
            score: DataTypes.FLOAT,
            isReviewed: DataTypes.BOOLEAN,
            startedAt: DataTypes.DATE,
            finishedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Take',
        },
    );
    return Take;
};
