import { withIronSession } from "next-iron-session"

const SESSION_SECRET = process.env.SESSION_SECRET || "your-session-secret"
const SESSION_NAME = process.env.SESSION_NAME || "next-session"

export default function ironSessionWrapper(handler) {
    return withIronSession(handler, {
        password: SESSION_SECRET,
        cookieName: SESSION_NAME,
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    })
}
