import { NextApiRequest, NextApiResponse } from "next"
import { createChatroom } from "../../../../../controllers/chatroomController"

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { chatroomName } = req.body
            const newChatroom = await createChatroom(chatroomName)
            res.status(200).json(newChatroom)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
}
