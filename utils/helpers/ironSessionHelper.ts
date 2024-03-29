import { SessionOptions } from "next-iron-session"
import { withIronSession } from "next-iron-session"

export const IRON_SESSION_CONFIG: SessionOptions = {
    password: process.env.COOKIE_PASSWORD,
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}

export function withSession(handler: any) {
    return withIronSession(handler, IRON_SESSION_CONFIG)
}
