import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authenticateUser } from "../../../controllers/userController"

export default NextAuth({
    providers: [
        Credentials({
            //@ts-ignore
            async authorize(credentials) {
                const { identifier, password } = credentials

                try {
                    const user = await authenticateUser(identifier, password)
                    if (!user) {
                        throw new Error("User not found")
                    }

                    // Create a token object to store the user data
                    const token = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                    }

                    return token
                } catch (error) {
                    throw new Error(error.message)
                }
            },
        }),
    ],
    session: {
        //@ts-ignore
        jwt: true,
    },
    callbacks: {
        //@ts-ignore
        async jwt(token, user) {
            if (user) {
                token = { ...token, ...user }
            }
            return token
        },
        //@ts-ignore
        async session(session, token) {
            if (token) {
                session.user = {
                    ...session.user,
                    email: token.email,
                    name: token.username,
                }
            }
            return session
        },
    },
})
