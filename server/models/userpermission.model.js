module.exports = (sequelize, Sequelize) => {
    const UserPermission = sequelize.define("userpermissions", {
      id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
      },
      userid: {
        type: Sequelize.INTEGER
      },
      isadmin: {
        type: Sequelize.BOOLEAN
      },
      taskacl: {
        type: Sequelize.JSON
      }
    });

    UserPermission.associate = function(models) {
      // associations can be defined here
      UserPermission.belongsTo(models.User, {
        foreignKey: 'userid',
        as: 'userpermissions'
      });
    };
  
    return UserPermission;
  };