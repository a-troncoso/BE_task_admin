const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;
const Op = require('../databases/database').Op;

const Task = sequelize.define('tasks', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  title: { type: Sequelize.STRING },
  isFinished: { type: Sequelize.BOOLEAN },
  isActive: { type: Sequelize.BOOLEAN }
});

module.exports = Task;