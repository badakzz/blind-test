import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { SSRProvider } from "react-bootstrap"
import Layout from "../components/Layout"

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
    return (
        <SSRProvider>
            <Layout user={pageProps.user}>
                <Component {...pageProps} />
            </Layout>
        </SSRProvider>
    )
}
export default MyApp
