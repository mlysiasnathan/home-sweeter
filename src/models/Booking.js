const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../lib/sequelize");


class Booking extends Model {
}

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        renterId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        propertyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            type: DataTypes.ENUM("pending", "approved", "rejected"),
            defaultValue: "pending",
        },
    },
    {
        tableName: "bookings",
        sequelize,
    }
);

module.exports = {Booking};
