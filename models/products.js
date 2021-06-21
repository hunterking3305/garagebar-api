const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('./dba').sequelize;

const Product = sequelize.define('Product', 
    {
        prodNo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        prodChineseName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        prodEngName: {
            type: DataTypes.STRING,
            allowNull: true, // default true
        },
        prodUpdateDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
        },
        prodCreateDate: {
            type: DataTypes.DATE,
            allowNull: true, 
            defaultValue: Sequelize.NOW,
        },
    },
    {
        // Model options
        tableName: 'products',
        timestamps: false,
    },
);


module.exports = {
    Product,
};