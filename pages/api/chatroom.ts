import { NextApiRequest, NextApiResponse } from "next"
import { withIronSession } from "next-iron-session"
import { getScoresByChatroom } from "../../controllers/scoreboardController"

const handler = withIronSession(
    async (req: NextApiRequest & { session: any }, res: NextApiResponse) => {
        if (req.method !== "GET") {
            return res.status(405).end()
        }

        const user = req.session.get("user")
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const { chatroomId } = req.query
        if (!chatroomId) {
            return res.status(400).json({ message: "Missing chatroom id" })
        }

        try {
            const scores = await getScoresByChatroom(Number(chatroomId))
            res.status(200).json(scores)
        } catch (error) {
            console.error("Error:", error.message)
            res.status(500).json({ message: error.message })
        }
    },
    {
        cookieName: process.env.COOKIE_NAME,
        password: process.env.COOKIE_PASSWORD,
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    }
)

export default handler
