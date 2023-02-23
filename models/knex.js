const knexfile = require("./knexfilec")

const knex = require("knex")(knexfile[process.env.NODE_ENV || "local"])

module.exports = knex
