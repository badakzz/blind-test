import { useState, FormEvent } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import { signIn } from "next-auth/react"

const Login = () => {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const router = useRouter()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const result = await signIn("credentials", {
                redirect: false,
                identifier,
                password,
            })

            if (!result.error) {
                router.push("/views/home")
            } else {
                // Handle login errors
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Email or Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
            {error && <div className="text-danger">{error}</div>}
        </Layout>
    )
}

export default Login
