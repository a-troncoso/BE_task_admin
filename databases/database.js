const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', '12345678', {
  dialect: 'postgres',
  host: 'localhost',
  pool: { max: 5, min: 0, require: 30000, idle: 1000 }
});

const Op = Sequelize.Op;
module.exports = { sequelize, Op };
