import sequelize from "../db/dbConfig.js";
import Dataypes from "sequelize";
import postModel from "./postModel.js";
import likeModel from "./likeModel.js";

const user = sequelize.define(
  "users",
  {
    id: {
      type: Dataypes.UUID,
      defaultValue: Dataypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: Dataypes.STRING,
      allowNull: false
    },
    password: {
      type: Dataypes.STRING,
      allowNull: false
    },
    email: {
      type: Dataypes.STRING,
      allowNull: false,
      validator: {
        isEmail: true
      }
    }
  },
  { paranoid: true }
);

user.hasMany(postModel, { foreignKey: "user_id" });
postModel.belongsTo(user, { foreignKey: "user_id" });
user.hasMany(likeModel, { foreignKey: "user_id" });
likeModel.belongsTo(user, { foreignKey: "user_id" });

export default user;
