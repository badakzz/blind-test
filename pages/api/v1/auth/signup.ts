import { NextApiRequest, NextApiResponse } from "next"
import { createUser } from "../../../../controllers/userController"
import { applySession } from "next-iron-session"
import { IRON_SESSION_CONFIG } from "../../../../utils/helpers/ironSessionHelper"

export default async function signup(
    req: NextApiRequest & { session: any },
    res: NextApiResponse
) {
    try {
        await applySession(req, res, IRON_SESSION_CONFIG) // Apply the session
        const user = await createUser({ req, res }) // Get the created user
        if (user) {
            // Check if the user object is valid
            req.session.set("user", user) // Set the user information in the session
            await req.session.save() // Save the session

            res.status(201).json({
                message: "User created and logged in successfully",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
