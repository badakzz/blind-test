import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { SSRProvider } from "react-bootstrap"
import { createContext, useState } from "react"
import { User } from "../utils/types"
import { SessionProvider } from "next-auth/react"

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
    console.log("user", pageProps.user)

    return (
        <SessionProvider session={pageProps.session}>
            <SSRProvider>
                <Component {...pageProps} />
            </SSRProvider>
        </SessionProvider>
    )
}
export default MyApp
