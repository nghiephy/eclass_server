'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post_Type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Post_Type.hasMany(models.Post, {
                foreignKey: 'type',
            });
        }
    }
    Post_Type.init(
        {
            key: DataTypes.STRING,
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Post_Type',
        },
    );
    return Post_Type;
};
