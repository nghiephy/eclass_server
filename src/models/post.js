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
            Post.hasOne(models.Material, {
                foreignKey: 'postId',
            });
            Post.hasOne(models.Exercise, {
                foreignKey: 'postId',
            });
            Post.hasMany(models.Comment, {
                foreignKey: 'postId',
            });
            Post.hasMany(models.Link, {
                foreignKey: 'postId',
            });
            Post.hasMany(models.File, {
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
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'post_types',
                    key: 'key',
                },
            },
            isHidden: DataTypes.BOOLEAN,
            isDelete: DataTypes.BOOLEAN,
            deadline: DataTypes.DATE,
            isCompleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Post',
        },
    );
    return Post;
};
