// const path = require('path')
// const Config = require('/home/badakzz/blind-test/config/')
// // const withTM = require('next-transpile-modules')
const dotenv = require("dotenv")
const path = require("path")

// Resolve the path to the .env file
const envPath = path.resolve(__dirname, "../env/local.env")

// Load the .env file
dotenv.config({ path: envPath })

// dotenv.config({ path: path.join(__dirname, "env", "local.env") })

module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false
        }
        return config
    },
    publicRuntimeConfig: {
        // Define the environment variable with the path to your images folder
        imageFolder: "/img",
    },
    env: {
        COOKIE_NAME: process.env.COOKIE_NAME,
        COOKIE_PASSWORD: process.env.COOKIE_PASSWORD,
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    },

    // Load .env.secrets file

    // Rest of your next.config.js content
}
// module.exports = {
//     async redirects() {
//         return [
//             {
//                 source: '/',
//                 destination: '/views/home',
//                 permanent: true,
//             },
//         ]
//     },
// }

// experimental: {
//     forceSwcTransforms: true,
// },
// env: {
//     NEXTAUTH_URL: Config.public.domain.prefix,
// },
// reactStrictMode: true,
// serverRuntimeConfig: Config.private,
// publicRuntimeConfig: Config.public,
// experimental: {},
// typescript: {
//     // !! WARN !!
//     // Dangerously allow production builds to successfully complete even if
//     // your project has type errors.
//     // !! WARN !!
//     ignoreBuildErrors: true,
// },
// webpack(config, { webpack, isServer }) {
//     config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//         path: false,
//         child_process: false,
//         net: false,
//         dns: false,
//         tls: false,
//     }

//     // config.resolve.fallback = {
//     //   ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
//     //   // by next.js will be dropped. Doesn't make much sense, but how it is
//     //   timers: false,
//     //   util: false,
//     //   tty: false,
//     //   crypto: false,
//     //   'path-browserify': false,
//     //   'stream-browserify': false,
//     //   'os-browserify': false,
//     //   assert: false,
//     //   stream: false,
//     //   os: false,
//     //   path: false,
//     //   fs: false
//     // };

//     // config.resolve.fallback = {
//     //   ...config.resolve.fallback,
//     //   fs: false
//     // }

//     // config.externals = {
//     //   "argon2": "argon2",
//     // }

//     //console.log('webpack isServer:' + isServer);
//     if (!isServer) {
//         // config.plugins.push(new webpack.IgnorePlugin({
//         //   resourceRegExp: /^knex$/,
//         // }));
//         // config.plugins.push(new webpack.IgnorePlugin({
//         //   resourceRegExp:/better-sqlite3/
//         // }));
//         // config.plugins.push(new webpack.IgnorePlugin({
//         //   resourceRegExp:/^knex$/
//         // }));
//         //
//         // config.plugins.push(new webpack.IgnorePlugin({
//         //   resourceRegExp:/(better-sqlite3|sqlite3|mssql|mysql|oracledb|pg-query-stream|pg-native)/
//         // }));
//         // config.plugins.push(new webpack.IgnorePlugin({
//         //   resourceRegExp:/^(knex)$/
//         // }));
//     }

//     // config.plugins.push(new webpack.IgnorePlugin({
//     //   resourceRegExp:/(better-sqlite3|sqlite3|mssql|mysql|oracledb|pg-query-stream|pg-native)/
//     // }));

//     return config
// },
// headers: async () => [
//     {
//         source: '/api/(.*)',
//         has: [
//             {
//                 type: 'header',
//                 key: 'Origin',
//                 value: Config.public.admBaseUrl,
//             },
//         ],
//         headers: [
//             { key: 'Access-Control-Allow-Credentials', value: 'true' },
//             {
//                 key: 'Access-Control-Allow-Origin',
//                 value: Config.public.admBaseUrl,
//             }, // Change this to specific domain for better security
//             {
//                 key: 'Access-Control-Allow-Methods',
//                 value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//             },
//             {
//                 key: 'Access-Control-Allow-Headers',
//                 value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
//             },
//         ],
//     },
// ],
// }
