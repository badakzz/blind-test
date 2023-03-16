import { NextApiRequest, NextApiResponse } from "next"
import { loginUser } from "../../../../controllers/userController"
import ironSessionWrapper from "../../../../utils/helpers/ironSessionWrapper"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        await loginUser({ req, res })
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
}

export default ironSessionWrapper(handler)
