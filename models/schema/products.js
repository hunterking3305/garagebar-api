const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dba').sequelize;

const Products = sequelize.define('products', {
    prodSerNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    prodName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 50],
        },
    },
    prodType: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    prodPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 999999999,
        },
    },
    prodDetail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [0, 250],
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
}, {
    // Model options
    tableName: 'products',
    timestamps: true,   // 更新/新增，資料時間戳記 (updatedAt, createdAt)
});

module.exports = {
    Products,
};