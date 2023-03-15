import Link from "next/link"

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account?{" "}
                <Link href="/register">
                    <a>Register here</a>
                </Link>
            </p>
        </div>
    )
}

export default Login
