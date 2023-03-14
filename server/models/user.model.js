

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });

    User.associate = function(models) {
        // associations can be defined here
        User.hasOne(models.userpermissions, {
          foreignKey: 'userid',
          as: 'userpermission'
        });
      };
  
    return User;
  };