module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
      },
      isadmin: {
        type: Sequelize.BOOLEAN
      },
      taskacl: {
        type: Sequelize.JSON
      }
    });
  
    return Role;
  };