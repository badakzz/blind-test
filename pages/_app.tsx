import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { SSRProvider } from "react-bootstrap"
import { withIronSession } from "next-iron-session"
import { IRON_SESSION_CONFIG } from "../utils/helpers/ironSessionHelper"

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
    console.log("user", pageProps.user)

    return (
        <SSRProvider>
            <Component {...pageProps} />
        </SSRProvider>
    )
}
export default MyApp
