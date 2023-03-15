import { NextApiRequest, NextApiResponse } from "next"
import Knex from "../models/knex"
import bcrypt from "bcryptjs"
import userSchema from "./validation/userSchema"

interface User {
    id: number
    user_name: string
    email: string
    password: string
    permissions: number
    is_active: boolean
}

interface CreateUserRequest {
    user_name: string
    email: string
    password: string
    permissions: number
    is_active: boolean
}

interface CreateUserResponse {
    message: string
}

export async function createUser({
    req,
    res,
}: {
    req: NextApiRequest
    res: NextApiResponse<CreateUserResponse>
}): Promise<void> {
    const { error, value } = userSchema.validate(req.body, {
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

    const query = Knex("users")
        .insert({
            user_name,
            email,
            password: hashedPassword,
            permissions: 1,
            is_active: true,
        })
        .into("users")
        .returning("*")

    console.log(query.toSQL())

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
