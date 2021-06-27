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
        cockliUpdateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        cockliCreateTime: {
            type: DataTypes.DATE,
            allowNull: false, 
            defaultValue: Sequelize.NOW,
        },
    },
    {
        // Model options
        tableName: 'cocktail_list',
        timestamps: false,
    },
);


module.exports = {
    CocktailList,
};