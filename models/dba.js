console.log("--- execute dba.js ---");

const { Sequelize } = require('sequelize');
const dba = require('../config/config').dbConfig;

const sequelize = new Sequelize(dba.database, dba.user, dba.password, {
  host: dba.host,
  dialect: dba.dialect,
});

module.exports = {
    sequelize
};