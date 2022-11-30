'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Exam extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Exam.hasMany(models.Exam_Question, {
                foreignKey: 'examId',
            });
            Exam.hasMany(models.Exam_Answer, {
                foreignKey: 'examId',
            });
            Exam.hasMany(models.Take, {
                foreignKey: 'examId',
            });
            Exam.belongsTo(models.Post, {
                foreignKey: 'postId',
            });
        }
    }
    Exam.init(
        {
            postId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            guide: DataTypes.TEXT,
            password: DataTypes.STRING,
            maxScore: DataTypes.INTEGER,
            totalQuestion: DataTypes.INTEGER,
            isBlock: DataTypes.BOOLEAN,
            requirePass: DataTypes.BOOLEAN,
            startedAt: DataTypes.DATE,
            finishedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Exam',
        },
    );
    return Exam;
};
