const dotenv = require("dotenv")
const path = require("path")
dotenv.config({ path: path.resolve(__dirname, "../env/local.env") })

const config = {
    development: {
        client: "pg",
        connection: {
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
        },
        migrations: {
            directory: path.join(__dirname, "db", "migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "db", "seeds"),
        },
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: path.join(__dirname, "db", "migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "db", "seeds", "production"),
        },
    },
}

console.log("config", config)

module.exports = config
