'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Private_Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Private_Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
            });
            Private_Comment.belongsTo(models.User, {
                foreignKey: 'userId',
            });
        }
    }
    Private_Comment.init(
        {
            userId: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
            content: DataTypes.TEXT,
            isDelete: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Private_Comment',
        },
    );
    return Private_Comment;
};
