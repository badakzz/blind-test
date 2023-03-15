const loadConf = require('./loadConf')
const nodeConfig = process.env.NODE_CONFIG
module.exports = loadConf(nodeConfig)
