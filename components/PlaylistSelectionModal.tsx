// components/PlaylistSelectionModal.tsx
import React, { useEffect, useState } from "react"
import {
    getAvailableGenres,
    getPlaylistsByGenre,
} from "../lib/spotify/spotifyAPI"

interface PlaylistSelectionModalProps {
    show: boolean
    onPlaylistSelected: (playlistId: string) => void
    onModalClose: () => void
}

const PlaylistSelectionModal: React.FC<PlaylistSelectionModalProps> = ({
    show,
    onPlaylistSelected,
    onModalClose,
}) => {
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)
    const [playlistList, setPlaylistList] = useState([])

    useEffect(() => {
        const fetchPlaylists = async () => {
            const genreIdList = await getAvailableGenres().then((genres) =>
                genres.map((item) => item.id)
            )
            const promises = genreIdList.map((genre) =>
                getPlaylistsByGenre(genre)
            )
            const playlistListByGenre = await Promise.all(promises)

            const playlistList = playlistListByGenre.reduce(
                (acc, playlists) => {
                    return playlists
                        ? acc.concat(playlists.filter((item) => item !== null))
                        : acc
                },
                []
            )

            // Remove duplicates
            const uniquePlaylistList = Array.from(
                new Set(playlistList.map((playlist) => playlist.id))
            ).map((id) => {
                return playlistList.find((playlist) => playlist.id === id)
            })

            setPlaylistList(uniquePlaylistList)
        }

        fetchPlaylists()
    }, [])

    const handlePlaylistChange = (event) => {
        setSelectedPlaylistId(event.target.value)
    }

    const handleSubmit = () => {
        if (selectedPlaylistId) {
            onPlaylistSelected(selectedPlaylistId)
            onModalClose()
        }
    }

    return (
        <div style={{ display: show ? "block" : "none" }}>
            <div>
                <h2>Select a Playlist</h2>
                <select onChange={handlePlaylistChange}>
                    {playlistList.map((playlist) => (
                        <option key={playlist.id} value={playlist.id}>
                            {playlist.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onModalClose}>Close</button>
            </div>
        </div>
    )
}

export default PlaylistSelectionModal
