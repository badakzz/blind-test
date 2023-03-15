const dotenv = require("dotenv")
// dotenv.config({ path: "../env/local.env" })
dotenv.config({ path: "../.env" })

const knexfile = require("./knexfile")
const knex = require("knex")(knexfile[process.env.NODE_ENV || "local"])

module.exports = knex
