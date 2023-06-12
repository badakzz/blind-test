import { NextApiRequest, NextApiResponse } from "next"
import { withIronSession } from "next-iron-session"
import { getScoreListByChatroomId } from "../../../../services/scoreboardServices"
import Joi from "joi"

const schemaQuery = Joi.object({
    chatroomId: Joi.string().required(),
})

const handler = withIronSession(
    async (req: NextApiRequest & { session: any }, res: NextApiResponse) => {
        if (req.method !== "GET") {
            return res.status(405).end()
        }

        const user = req.session.get("user")
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const sanitizedQuery = await schemaQuery.validateAsync(req.query)
        if (!sanitizedQuery.chatroomId) {
            return res.status(400).json({ message: "Missing chatroom id" })
        }

        try {
            const scores = await getScoreListByChatroomId(
                sanitizedQuery.chatroomId
            )
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
            secure: process.env.NODE_ENV === "development",
        },
    }
)

export default handler
