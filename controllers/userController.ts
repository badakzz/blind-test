import { NextApiRequest, NextApiResponse } from "next"
import Knex from "../models/knex"
import bcrypt from "bcryptjs"
import { userSignupSchema, userLoginSchema } from "./validation/userSchemas"
import { isEmailValid } from "../utils/helpers/emailHelper"
import { User } from "../utils/types"
import { isFieldUnique } from "../utils/helpers/dbHelper"

interface CreateUserResponse {
    message: string
}

interface SessionData {
    user: {
        id: number
        email: string
    }
}

export async function createUser({
    req,
    res,
}: {
    req: NextApiRequest
    res: NextApiResponse<CreateUserResponse>
}): Promise<User> {
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

    // Check if the username is unique
    const isUsernameUnique = await isFieldUnique(
        "users",
        "user_name",
        user_name
    )
    if (!isUsernameUnique) {
        res.status(400).json({
            message: "Username is already in use",
        })
        return
    }

    // Check if the email is unique
    const isEmailUnique = await isFieldUnique("users", "email", email)
    if (!isEmailUnique) {
        res.status(400).json({
            message: "Email is already in use",
        })
        return
    }

    const user = await Knex("users")
        .insert({
            user_name,
            email,
            password: hashedPassword,
            permissions: 1,
            is_active: true,
        })
        .returning("*")
        .then((rows) => rows[0])

    // Return the user object with the same structure as the authenticateUser function
    return {
        id: user.user_id,
        email: user.email,
        username: user.user_name,
        isActive: user.is_active,
    }
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

    try {
        const user = await authenticateUser(identifier, password)

        // Set the session cookie
        req.session.user = { id: user.id, email: user.email }
        res.status(200).json({ message: "Logged in successfully" })
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export async function authenticateUser(
    identifier: string,
    password: string
): Promise<User> {
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
        throw new Error("Invalid identifier")
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        // Handle error: password is incorrect
        throw new Error("Invalid password")
    }

    // Return the user object with the username
    return {
        id: user.user_id,
        email: user.email,
        username: user.user_name,
        isActive: user.is_active,
    }
}
