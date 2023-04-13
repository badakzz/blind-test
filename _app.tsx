import '../styles/theme.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { SSRProvider } from 'react-bootstrap'
import { QueryClient, QueryClientProvider } from 'react-query'

// Create a client
// const queryClient = new QueryClient({})

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
    return <Component {...pageProps} />
}
export default MyApp