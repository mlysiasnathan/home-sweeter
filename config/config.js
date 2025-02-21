module.exports = {
    development: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASS || null,
        database: process.env.DB_NAME || "home_sweeter",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
    },
    test: {
        username: "root",
        password: null,
        database: "home_sweeter",
        host: "127.0.0.1",
        dialect: "mysql"
    },
};
