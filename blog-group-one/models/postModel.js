import sequelize from "../db/dbConfig.js";
import DataTypes from "sequelize";
import likeModel from "./likeModel.js";

const post = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      References: {
        model: "users",
        key: "id"
      }
    }
  },
  { paranoid: true }
);

post.hasMany(likeModel, { foreignKey: "post_id" });
likeModel.belongsTo(post, { foreignKey: "post_id" });

export default post;
