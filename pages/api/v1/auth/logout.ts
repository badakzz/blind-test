import { withIronSession } from "next-iron-session"

const sessionOptions = {
    cookieName: process.env.COOKIE_NAME,
    password: process.env.COOKIE_PASSWORD,
}

const handler = async (req, res) => {
    if (req.method === "POST") {
        // Call the destroy method on the session object
        req.session.destroy()

        // Send a successful response
        res.status(200).json({ message: "Logged out successfully" })
    } else {
        // Handle other request methods
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default withIronSession(handler, sessionOptions)
