'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    isFinished: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};