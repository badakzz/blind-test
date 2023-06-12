import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { SSRProvider } from "react-bootstrap"
import Layout from "../../components/Layout"
import { QueryClient, QueryClientProvider } from "react-query"

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <SSRProvider>
                <Layout user={pageProps.user}>
                    <Component {...pageProps} />
                </Layout>
            </SSRProvider>
        </QueryClientProvider>
    )
}
export default MyApp
