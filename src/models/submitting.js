'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Submitting extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Submitting.hasMany(models.Submit_File, {
                foreignKey: 'submitId',
            });
            Submitting.hasOne(models.Result_Submit, {
                foreignKey: 'submitId',
            });
            Submitting.belongsTo(models.User, {
                foreignKey: 'userId',
            });
            Submitting.belongsTo(models.Answer, {
                foreignKey: 'answerChoice',
            });
            Submitting.belongsTo(models.Exercise, {
                foreignKey: 'exerciseId',
            });
        }
    }
    Submitting.init(
        {
            userId: DataTypes.INTEGER,
            answer: DataTypes.TEXT,
            answerChoice: DataTypes.INTEGER,
            exerciseId: DataTypes.INTEGER,
            isMarked: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Submitting',
        },
    );
    return Submitting;
};
