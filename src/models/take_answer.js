'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Take_Answer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Take_Answer.belongsTo(models.Exam_Question, {
                foreignKey: 'exquesId',
            });
            Take_Answer.belongsTo(models.Exam_Answer, {
                foreignKey: 'exanswerId',
            });
            Take_Answer.belongsTo(models.Take, {
                foreignKey: 'takeId',
            });
        }
    }
    Take_Answer.init(
        {
            takeId: DataTypes.INTEGER,
            exquesId: DataTypes.INTEGER,
            exanswerId: DataTypes.INTEGER,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Take_Answer',
        },
    );
    return Take_Answer;
};
