module.exports = {
    nodeConfig: 'local',
    isLocal: true,
    domain: {
        projectName: 'blind-test',
        prefix: 'http://',
        baseApp: 'localhost:3000',
        baseAdm: 'localhost:3001',
        apiBase: '/api/v1',
    },
    locales: {
        languages: ['en', 'fr'],
    },
}
