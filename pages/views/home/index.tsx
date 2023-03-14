import Link from 'next/link'
import Layout from '../components/Layout'
import { Button } from 'react-bootstrap'

const Home = () => {
    return (
        // <Layout>
        <div>
            <h1>Play Blind-Test with your friends using Spotify playlist!</h1>
            <p>
                Welcome to our Blind-Test game! You can start playing right away
                without logging in. However, if you want to use your own
                playlists and make it more fun, log in and enjoy!
            </p>
            <div>
                <Button>Play</Button>
                <Link href="/login">Not a member? Sign up now</Link>
                <p>
                    Or, join a <Link href="chat/chatroom">chat room</Link> and
                    talk with your friends!
                </p>
            </div>
        </div>
        // </Layout>
    )
}

export default Home
