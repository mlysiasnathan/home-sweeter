import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/sequelize";
import {User} from "./User"; // Import User model

class Property extends Model {}

Property.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hostId: {
        type: DataTypes.UUID, //  Fix: Match User model's UUID type
        allowNull: false,
        references: {
          model: "users", // Must match table name in the database
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "properties",
      sequelize,
    }
);

//  Define Relationship
// Property.belongsTo(User, { foreignKey: "hostId", onDelete: "CASCADE" });

export {Property};
