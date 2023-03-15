import { NextApiRequest, NextApiResponse } from "next"
import { createUser } from "../../../../controllers/userController"

export default async function signup(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { user_name, email, password, permissions, is_active } = req.body
        await createUser({ req, res })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
