import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { SSRProvider } from "react-bootstrap"

// import { SessionProvider } from 'next-auth/react'

// Create a client
// const queryClient = new QueryClient({})

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
    return (
        <SSRProvider>
            <Component {...pageProps} />
        </SSRProvider>
    )
}
export default MyApp
