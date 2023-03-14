module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
      },
      task: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      completed: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Task;
  };