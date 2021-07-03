const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./dba').sequelize;

const CocktailList = sequelize.define('cocktail_list', 
    {
        cockliSerNo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        cockliChaName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
        },
        cockliEngName: {
            type: DataTypes.STRING,
            allowNull: true, // default true
            validate: {
                len: [0, 50],
            },
        },
        cockliClass: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cockliBase: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 99,
            validate: {
                min: 0,
                max: 999,
            },
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        // Model options
        tableName: 'cocktail_list',
        timestamps: true,   // 更新/新增，資料時間戳記 (updatedAt, createdAt)
    },
);


module.exports = {
    CocktailList,
};