module.exports = {
    development: {
        client: "pg",
        connection: {
            host: "127.0.0.1",
            user: "your_database_user",
            password: "your_database_password",
            database: "myapp_test",
        },
        migrations: {
            directory: __dirname + "/src/db/migrations",
        },
        seeds: {
            directory: __dirname + "/src/db/seeds",
        },
    },

    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + "/src/db/migrations",
        },
        seeds: {
            directory: __dirname + "/src/db/seeds/production",
        },
    },
}
