'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class File extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            File.belongsTo(models.Post, {
                foreignKey: 'postId',
            });
        }
    }
    File.init(
        {
            postId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            type: DataTypes.STRING,
            url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'File',
        },
    );
    return File;
};
