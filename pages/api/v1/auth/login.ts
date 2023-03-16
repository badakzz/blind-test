import { NextApiRequest, NextApiResponse } from "next"
import { loginUser } from "../../../../controllers/userController"

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { identifier, password } = req.body
        await loginUser({ req, res })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
