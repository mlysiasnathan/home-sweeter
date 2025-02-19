import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/sequelize";
import {User} from "./User"; // Import User model
import {Property} from "./Property"; // Import Property model

class Booking extends Model {}

Booking.init(
    {
      id: {
        type: DataTypes.UUID, // Match User's UUID type
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      renterId: {
        type: DataTypes.UUID, // Match User's UUID type
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
        onDelete: "CASCADE",
      },
      propertyId: {
        type: DataTypes.UUID, // Match Property's UUID type
        allowNull: false,
        references: {
          model: Property,
          key: "id",
        },
        onDelete: "CASCADE",
      },
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
    },
    {
      tableName: "bookings",
      sequelize,
    }
);

//  Define relationships
// Booking.belongsTo(User, { foreignKey: "renterId", as: "renter" });
// Booking.belongsTo(Property, { foreignKey: "propertyId", as: "property" });

export {Booking};
