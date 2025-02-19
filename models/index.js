'use strict';

// import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/sequelize";
// import {Property} from "./Property"; // Import related models
// import {Booking} from "./Booking";
//
// class User extends Model {}
//
// User.init(
//     {
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//             allowNull: false,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false,
//         },
//         image: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//         role: {
//             type: DataTypes.ENUM("renter", "host"),
//             defaultValue: "renter",
//         },
//     },
//     {
//         tableName: "users",
//         sequelize,
//     }
// );
//
// //  Define relationships (Make sure Property & Booking models exist)
// User.hasMany(Property, { foreignKey: "hostId", onDelete: "CASCADE" });
// User.hasMany(Booking, { foreignKey: "renterId", onDelete: "CASCADE" });
//
// export {User};
//
// import { DataTypes, Model } from "sequelize";
// import { sequelize } from "../lib/sequelize";
// import {User} from "./User"; // Import User model
//
// class Property extends Model {}
//
// Property.init(
//     {
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//             allowNull: false,
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         description: {
//             type: DataTypes.TEXT,
//             allowNull: true,
//         },
//         price: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         location: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         hostId: {
//             type: DataTypes.UUID, //  Fix: Match User model's UUID type
//             allowNull: false,
//             references: {
//                 model: "users", // Must match table name in the database
//                 key: "id",
//             },
//             onDelete: "CASCADE",
//         },
//     },
//     {
//         tableName: "properties",
//         sequelize,
//     }
// );
//
// //  Define Relationship
// // Property.belongsTo(User, { foreignKey: "hostId", onDelete: "CASCADE" });
//
// export {Property};
//
//
// class Booking extends Model {}
//
// Booking.init(
//     {
//         id: {
//             type: DataTypes.UUID, // Match User's UUID type
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//             allowNull: false,
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         renterId: {
//             type: DataTypes.UUID, // Match User's UUID type
//             allowNull: false,
//             references: {
//                 model: User,
//                 key: "id",
//             },
//             onDelete: "CASCADE",
//         },
//         propertyId: {
//             type: DataTypes.UUID, // Match Property's UUID type
//             allowNull: false,
//             references: {
//                 model: Property,
//                 key: "id",
//             },
//             onDelete: "CASCADE",
//         },
//         checkIn: {
//             type: DataTypes.DATE,
//             allowNull: false,
//         },
//         checkOut: {
//             type: DataTypes.DATE,
//             allowNull: false,
//         },
//         status: {
//             type: DataTypes.STRING,
//             defaultValue: "pending",
//         },
//     },
//     {
//         tableName: "bookings",
//         sequelize,
//     }
// );
//
// //  Define relationships
// // Booking.belongsTo(User, { foreignKey: "renterId", as: "renter" });
// // Booking.belongsTo(Property, { foreignKey: "propertyId", as: "property" });
//
// export {Booking};
export default {sequelize}



