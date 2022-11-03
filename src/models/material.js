'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Material extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Material.belongsTo(models.Post, {
                foreignKey: 'postId',
            });
            Material.belongsTo(models.Topic, {
                foreignKey: 'topicId',
            });
        }
    }
    Material.init(
        {
            postId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            guide: DataTypes.TEXT,
            topicId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Material',
        },
    );
    return Material;
};
