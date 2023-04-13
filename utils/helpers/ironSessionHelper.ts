import { SessionOptions } from "next-iron-session"

export const IRON_SESSION_CONFIG: SessionOptions = {
    password: process.env.COOKIE_PASSWORD,
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}

console.log("session", IRON_SESSION_CONFIG)
