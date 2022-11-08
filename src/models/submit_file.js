'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Submit_File extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Submit_File.belongsTo(models.Submitting, {
                foreignKey: 'submitId',
            });
        }
    }
    Submit_File.init(
        {
            submitId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            type: DataTypes.STRING,
            url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Submit_File',
        },
    );
    return Submit_File;
};
