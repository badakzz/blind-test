const dotenv = require("dotenv")
dotenv.config({ path: "../env/local.env" })

const knexfile = require("./knexfile")
const knex = require("knex")(knexfile[process.env.NODE_ENV || "development"])

module.exports = knex
