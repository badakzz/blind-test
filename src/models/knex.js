const dotenv = require('dotenv');
console.log('ccc')
dotenv.config({ path: './env/local.env' });

const knexfile = require("./knexfilec")
const knex = require("knex")(knexfile[process.env.NODE_ENV || "local"])

console.log('aaaa', typeof process.env.POSTGRES_PASSWORD, process.env.POSTGRES_PASSWORD);

module.exports = knex;