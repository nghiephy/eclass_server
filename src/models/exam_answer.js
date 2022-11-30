'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Exam_Answer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Exam_Answer.hasMany(models.Take_Answer, {
                foreignKey: 'exanswerId',
            });
            Exam_Answer.belongsTo(models.Exam, {
                foreignKey: 'examId',
            });
            Exam_Answer.belongsTo(models.Exam_Question, {
                foreignKey: 'exquesId',
            });
        }
    }
    Exam_Answer.init(
        {
            examId: DataTypes.INTEGER,
            exquesId: DataTypes.INTEGER,
            correct: DataTypes.BOOLEAN,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Exam_Answer',
        },
    );
    return Exam_Answer;
};
