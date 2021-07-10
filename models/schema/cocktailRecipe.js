const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dba').sequelize;

const CocktailRecipe = sequelize.define('cocktail_recipe',
    {
        recSerNo: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        cockliSerNo: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'cocktail_list',
                key: 'cockliSerNo',
            },
        },
        recMaterial: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: [0, 200],
            },
        },
        recDecoration: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: [0, 200],
            },
        },
        recMethod: {
            type: DataTypes.INTEGER(3),
            allowNull: true,
        },
        recCup: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
        },
        recSteps: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [0, 600],
            },
        },
        recABV: {
            type: DataTypes.FLOAT(6,4),
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        // Model options
        tableName: 'cocktail_recipe',
        timestamps: true,   // 更新/新增，資料時間戳記 (updatedAt, createdAt)
    },
);

module.exports = {
    CocktailRecipe,
};