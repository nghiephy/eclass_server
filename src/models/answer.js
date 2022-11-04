'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Answer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Answer.belongsTo(models.Exercise, {
                foreignKey: 'exerciseId',
            });
        }
    }
    Answer.init(
        {
            exerciseId: DataTypes.INTEGER,
            content: DataTypes.TEXT,
            correct: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Answer',
        },
    );
    return Answer;
};
