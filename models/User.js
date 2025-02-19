import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/sequelize";
import {Property} from "./Property"; // Import related models
import {Booking} from "./Booking";

class User extends Model {}

User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("renter", "host"),
        defaultValue: "renter",
      },
    },
    {
      tableName: "users",
      sequelize,
    }
);

//  Define relationships (Make sure Property & Booking models exist)
User.hasMany(Property, { foreignKey: "hostId", onDelete: "CASCADE" });
User.hasMany(Booking, { foreignKey: "renterId", onDelete: "CASCADE" });

export {User};
