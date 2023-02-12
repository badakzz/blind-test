const localPrivateConfig = require('./local/private')
const localPublicConfig = require('./local/public')

module.exports = (nodeConfig) => {
    let additionalPrivateConf = {}
    let additionalPublicConf = {}

    if (nodeConfig && nodeConfig !== 'local') {
        additionalPrivateConf = require(`./${nodeConfig}/private`)
        additionalPublicConf = require(`./${nodeConfig}/public`)
    }

    const privateConf = { ...localPrivateConfig, ...additionalPrivateConf }
    const publicConf = { ...localPublicConfig, ...additionalPublicConf }

    publicConf.appBaseUrl = `${publicConf.domain.prefix}${publicConf.domain.baseApp}`
    publicConf.admBaseUrl = `${publicConf.domain.prefix}${publicConf.domain.baseAdm}`
    privateConf.isLocal = nodeConfig === 'local'

    return {
        private: privateConf,
        public: publicConf,
    }
}
