import { NextApiRequest, NextApiResponse } from "next"
import Knex from "../models/knex"
import bcrypt from "bcryptjs"
import { userSignupSchema, userLoginSchema } from "./validation/userSchema"
import { isEmailValid } from "../utils/helpers/emailHelper"

interface User {
    id: number
    user_name: string
    email: string
    password: string
    permissions: number
    is_active: boolean
}
interface CreateUserResponse {
    message: string
}

interface SessionData {
    user: {
        id: string
        email: string
    }
}

interface SessionData {
    user: {
        id: string
        email: string
    }
}

export async function createUser({
    req,
    res,
}: {
    req: NextApiRequest
    res: NextApiResponse<CreateUserResponse>
}): Promise<void> {
    const { error, value } = userSignupSchema.validate(req.body, {
        abortEarly: false,
    })
    if (error) {
        res.status(400).json({
            message: error.details.map((detail) => detail.message),
        })
        console.log(error)
        return
    }

    const { user_name, email, password, permissions, is_active } = value

    const hashedPassword = await bcrypt.hash(password, 10)

    const user: User = await Knex("users")
        .insert({
            user_name,
            email,
            password: hashedPassword,
            permissions: 1,
            is_active: true,
        })
        .returning("*")
        .then((rows) => rows[0])

    res.status(201).json({ message: "User created successfully" })
}

export async function loginUser({
    req,
    res,
}: {
    req: NextApiRequest & { session?: SessionData }
    res: NextApiResponse<CreateUserResponse>
}): Promise<void> {
    const { error, value } = userLoginSchema.validate(req.body, {
        abortEarly: false,
    })
    if (error) {
        res.status(400).json({
            message: error.details.map((detail) => detail.message),
        })
        console.log(error)
        return
    }

    const { identifier, password } = value

    // Query the user by identifier only (either email or username)
    const user = await Knex("users")
        .where(function () {
            if (isEmailValid(identifier)) {
                this.where("email", identifier)
            } else {
                this.where("user_name", identifier)
            }
        })
        .first()

    if (!user) {
        // Handle error: identifier not found
        res.status(401).json({ message: "Invalid identifier" })
        return
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        // Handle error: password is incorrect
        res.status(401).json({ message: "Invalid password" })
        return
    }

    // Set the session cookie
    req.session.user = { id: user.id, email: user.email }
    res.status(200).json({ message: "Logged in successfully" })
}
