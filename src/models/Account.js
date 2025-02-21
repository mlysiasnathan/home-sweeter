const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../lib/sequelize");

class Account extends Model {
}

Account.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID, // Ensure this matches users.id
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        providerAccountId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "accounts",
        sequelize,
    }
);

module.exports = {Account};
