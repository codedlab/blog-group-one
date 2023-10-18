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
      // required: true
    },
    user_id: {
      type: DataTypes.UUID,
      // required: true
      references: {
        model: "users",
        key: "id"
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
      // required: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
      // required: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
      // required: true
    }
  },
  { paranoid: true }
);

post.hasMany(likeModel, { foreign_key: "post_id" });
likeModel.belongsTo(post, { foreignKey: "post_id" });

export default post;
