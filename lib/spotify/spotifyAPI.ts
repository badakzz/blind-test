import axios from "axios"

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

let accessToken = ""

export const getAccessToken = async () => {
    const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        null,
        {
            params: {
                grant_type: "client_credentials",
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                    `${clientId}:${clientSecret}`
                ).toString("base64")}`,
            },
        }
    )

    accessToken = response.data.access_token
}

export const getAvailableGenres = async () => {
    if (!accessToken) {
        await getAccessToken()
    }

    const response = await axios.get(
        "https://api.spotify.com/v1/browse/categories",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )

    return response.data.categories.items
}

export const getPlaylistsByGenre = async (genreId) => {
    if (!accessToken) {
        await getAccessToken()
    }

    const response = await axios.get(
        `https://api.spotify.com/v1/browse/categories/${genreId}/playlists`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )

    return response.data.playlists.items
}

export const getRandomTrackPreviewFromPlaylist = async (playlistId) => {
    if (!accessToken) {
        await getAccessToken()
    }

    const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )

    const tracks = response.data.items.filter((item) => item.track.preview_url)
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)]

    return {
        previewUrl: randomTrack.track.preview_url,
        name: randomTrack.track.name,
        artist: randomTrack.track.artists[0].name,
    }
}
