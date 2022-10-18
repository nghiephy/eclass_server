'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Post.hasMany(models.Comment, {
                foreignKey: 'postId',
            });
            Post.belongsTo(models.User, {
                foreignKey: 'userId',
            });
            Post.belongsTo(models.Class, {
                foreignKey: 'class',
            });
            Post.belongsTo(models.Post_Type, {
                foreignKey: 'type',
                targetKey: 'key',
            });
        }
    }
    Post.init(
        {
            userId: DataTypes.INTEGER,
            class: DataTypes.INTEGER,
            content: DataTypes.TEXT,
            type: DataTypes.STRING,
            isHidden: DataTypes.BOOLEAN,
            isDelete: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Post',
        },
    );
    return Post;
};
