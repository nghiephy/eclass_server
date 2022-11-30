'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Exam_Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Exam_Question.hasMany(models.Exam_Answer, {
                foreignKey: 'exquesId',
            });
            Exam_Question.hasMany(models.Take_Answer, {
                foreignKey: 'exquesId',
            });
            Exam_Question.belongsTo(models.Exam, {
                foreignKey: 'examId',
            });
        }
    }
    Exam_Question.init(
        {
            examId: DataTypes.INTEGER,
            question: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Exam_Question',
        },
    );
    return Exam_Question;
};
