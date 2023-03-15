const path = require('path')

module.exports = {
    nodeConfig: 'local',
    db: {
        client: 'pg',
        // searchPath: ['knex_schema'],
        connection: {
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT || 5432,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
        },
        //     pool: { min: 0, max: 50 },
        //     migrations: {
        //         //extension: 'ts',
        //         //loadExtensions: ['.ts'],
        //         directory: path.join(__dirname, '../../common/db/migrations'),
        //     },
        //     seeds: {
        //         directory: path.join(__dirname, '../../common/db/seeds/dev'),
        //     },
        // },
        // cookie: {
        domain: null,
        suffix: '-local',
    },
    email: {
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            user: process.env.EMAIL_SERVER_USER,
            password: process.env.EMAIL_SERVER_PASSWORD,
        },
        from: 'yo@yo.fr',
        forward_to: 'lucas.deray@gmail.com',
    },
    invitation: {
        secret: process.env.INVITATION_SECRET,
    },
    worker_auth: {
        session: {
            expiration: 24 * 60, // in minutes
            inactive: 5, // in minutes
        },
    },
    auth: {
        cookieName: 'auth',
        accessToken: {
            secret: 'access',
            // secret: parseSecret(process.env.JSONTOKENIZER_SECRET),
            maxAge: 60, // 1 hour
        },
        refreshToken: {
            secret: 'refresh',
            // secret: parseSecret(process.env.JSONTOKENIZER_SECRET),
            maxAge: 24 * 60 * 60, // 30 day
        },
        cookie: {
            secure: false,
            httpOnly: true,
            domain: 'localhost',
        },
    },
    jsontokenizer: {
        //secret: parseSecret(process.env.JSONTOKENIZER_SECRET),
        validity: 30,
    },
    passport: {
        cookieName: 'project_LOCAL_id',
        secret: process.env.PASSPORT_SECRET,
    },
    hashsalt: {
        minLength: 4,
        generic: 'local_generic_salt',
        user: 'local_user_salt',
        project: 'local_project_salt',
        project_invitation: 'local_project_invitation_salt',
        worker_credential: 'local_worker_credential_salt',
        worker_session: 'local_worker_session_salt',
        blueprint: 'local_blueprint_salt',
        schedule: 'local_schedule_salt',
        execution: 'local_execution_salt',
        queued_job: 'local_queued_job_salt',
        secret_provider: 'local_secret_provider_salt',
        secret_variable: 'local_secret_variable_salt',
    },
}
