module.exports = (sequelize, Sequelize) => {
    const UserGroup = sequelize.define("usergroups", {
      id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
      },
      userid: {
        type: Sequelize.INTEGER
      },
      groupid: {
        type: Sequelize.INTEGER
      },
    });
  
    return UserGroup;
  };