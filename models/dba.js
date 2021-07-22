const { Sequelize } = require('sequelize');
const dba = require('../config/config').dbConfig;

const sequelize = new Sequelize(dba.database, dba.user, dba.password, {
  host: dba.host,
  dialect: dba.dialect,
  timezone: '+08:00',
  logging: false, // disable logging; default: console.log
});

module.exports = {
    sequelize
};