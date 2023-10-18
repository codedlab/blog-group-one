import sequelize from "../db/dbConfig.js";
import DataTypes from "sequelize";

const likes = sequelize.define(
  "likes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.UUID,
      reference: {
        model: "posts",
        key: "id"
      }
    },
    user_id: {
      type: DataTypes.UUID,
      reference: {
        model: "users",
        key: "id"
      }
    }
  }
  // {paranoid: true}
);

export default likes;
