import sequelize from "../db/dbConfig.js";
import DataTypes from "sequelize";

const like = sequelize.define(
  "likes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      References: {
        model: "users",
        key: "id"
      }
    },
    post_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      References: {
        model: "posts",
        key: "id"
      }
    }
  },
  { paranoid: true }
);

export default like;
