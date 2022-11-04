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
        }
    }
    Material.init(
        {
            postId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            guide: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Material',
        },
    );
    return Material;
};
