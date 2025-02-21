module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("accounts", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.UUID, // Match users.id type
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            provider: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            providerAccountId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("accounts");
    },
};
