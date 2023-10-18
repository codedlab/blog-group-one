import Sequelize from "sequelize";

const sequelize = new Sequelize("blog_group_one", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

export default sequelize;
