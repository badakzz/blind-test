import { NextApiRequest, NextApiResponse } from "next"
import Knex from "../models/knex"
import bcrypt from "bcryptjs"
import Joi from "joi"

// const schemaPost = Joi.object({
//   username: Joi.string()
//       .required()
//       .min(2)
//       .max(INPUT_VALIDATION_RULE.CHAR_LIMIT_TINY)
//       .custom(sanitizeStringFilterHtmlOut),
//   org_type: Joi.string()
//       .valid(...getNumericEnumValues(ORG_TYPE))
//       .required(),
//   owner_email: emailRequiredValidation,
//   email_domain: Joi.string()
//       .allow(null)
//       .max(INPUT_VALIDATION_RULE.EMAIL_CHAR_LIMIT)
//       .lowercase()
//       .custom(sanitizeStringFilterHtmlOut),
// })

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
    const { user_name, email, password, permissions, is_active } =
        req.body as CreateUserRequest
    console.log("req", req.body)
    if (!user_name || !email || !password) {
        throw new Error("Username, email, and password are required")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    // const query = Knex("users")
    //     .insert({
    //         username,
    //         email,
    //         password: hashedPassword,
    //     })
    //     .into("users")
    //     .returning("*")

    // console.log(query.toSQL())
    const user: User = await Knex("users")
        .insert({
            user_name,
            email,
            password: hashedPassword,
            permissions: 1,
            is_active: true,
        })
        // .into("users")
        .returning("*")
        .then((rows) => rows[0])

    res.status(201).json({ message: "User created successfully" })
}
