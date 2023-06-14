export default function Home() {
    return <h1>Home page</h1>
}

export async function getServerSideProps() {
    const content = null

    if (!content) {
        return {
            redirect: {
                permanent: false,
                destination: '/views/home',
            },
        }
    }

    return {
        props: {},
    }
}
