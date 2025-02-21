const {sequelize} = require("../lib/sequelize");
const {User} = require("./User");
const {Property} = require("./Property");
const {Booking} = require("./Booking");

// Define relationships AFTER all models are imported
User.hasMany(Property, {foreignKey: "hostId", onDelete: "CASCADE"});
Property.belongsTo(User, {foreignKey: "hostId"});

User.hasMany(Booking, {foreignKey: "renterId", onDelete: "CASCADE"});
Booking.belongsTo(User, {foreignKey: "renterId"});

Property.hasMany(Booking, {foreignKey: "propertyId", onDelete: "CASCADE"});
Booking.belongsTo(Property, {foreignKey: "propertyId"});

module.exports = {sequelize, User, Property, Booking};
