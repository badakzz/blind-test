import { NextApiRequest, NextApiResponse } from "next"
import { withIronSession } from "next-iron-session"
import { authenticateUser } from "../../../../controllers/userController"
const dotenv = require("dotenv")

dotenv.config({ path: "../../../../env/local.env" })

const sessionConfig = {
    cookieName: process.env.COOKIE_NAME,
    password: process.env.COOKIE_PASSWORD,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}

const handler = async (
    req: NextApiRequest & { session: any },
    res: NextApiResponse
) => {
    if (req.method !== "POST") {
        return res.status(405).end()
    }

    const { identifier, password } = req.body

    try {
        const user = await authenticateUser(identifier, password)
        req.session.set("user", user)
        await req.session.save()
        res.status(200).json({ message: "Logged in successfully" })
    } catch (error) {
        console.error("Error:", error.message)
        res.status(401).json({ message: error.message })
    }
}
export default withIronSession(handler, sessionConfig)
