module.exports = (sequelize, Sequelize) => {
    const UserPermission = sequelize.define("userpermissions", {
      id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
      },
      userid: {
        type: Sequelize.STRING
      },
      isadmin: {
        type: Sequelize.BOOLEAN
      },
      taskacl: {
        type: Sequelize.JSON
      }
    });
  
    return UserPermission;
  };