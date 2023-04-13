import { SessionOptions } from "next-iron-session"

// const dotenv = require("dotenv")
// dotenv.config({ path: "../../env/local.env" })
// console.log("EXxxDEEE")
// console.log("COOKIE_NAME:", process.env.COOKIE_NAME)
// console.log("SECRET_COOKIE_PASSWORD:", process.env.SECRET_COOKIE_PASSWORD)
// console.log("NODE_ENV:", process.env.NODE_ENV)
export const IRON_SESSION_CONFIG: SessionOptions = {
    password: process.env.COOKIE_PASSWORD,
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}

console.log("session", IRON_SESSION_CONFIG)
