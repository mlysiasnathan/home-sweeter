const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../lib/sequelize");


class User extends Model {
}

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
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
    }
);

module.exports = {User};
