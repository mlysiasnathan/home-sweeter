import {Sequelize} from "sequelize";
import mysql2 from "mysql2";
import config from "../../config/config";

// Get the current environment (development, production, etc.)
const env = process.env.NODE_ENV || "development";

// Load the correct database configuration
const dbConfig = config[env];

// Initialize Sequelize
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialectModule: mysql2,
        dialect: dbConfig.dialect,
        logging: false, // Set to 'console.log' if you want to see SQL queries
    }
);
sequelize
    .authenticate()
    .then(() => console.log("✅ Connection successfully"))
    .catch((error) => console.error("🚫🚫Unable to connect to the database: ", error.message));
// Sync database (only for development)
// sequelize.sync({alter: true}) // This updates tables if needed
//     .then(() => console.log("✅ Tables synced"))
//     .catch((err) => console.error("🚫🚫Error syncing tables:", err));

export {sequelize};
