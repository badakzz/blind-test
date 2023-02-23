require("dotenv").config({ path: "./env/local.env" })

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_NAME,
        },
        migrations: {
            directory: "./models/db/migrations",
        },
        seeds: {
            directory: "./models/db/seeds",
        },
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: "./models/db/migrations",
        },
        seeds: {
            directory: "./models/db/seeds/production",
        },
    },
}
