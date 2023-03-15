module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
      id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      roleid: {
        type: Sequelize.INTEGER
      }
    });
  
    return Group;
  };