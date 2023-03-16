import { useState } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"

const Login = () => {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier: identifier,
                password: password,
            }),
        })

        if (res.ok) {
            const { user } = await res.json()
            // Set the user in the Layout component to trigger a re-render and show the user's name
            router.replace("/", undefined, { shallow: true })
            router.reload()
        } else {
            // Handle error
            const { message } = await res.json()
            setError(message)
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
