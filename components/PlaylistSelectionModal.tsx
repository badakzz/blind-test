// components/PlaylistSelectionModal.tsx
import React, { useEffect, useState } from "react"
import { getPlaylistsByGenre } from "../lib/spotify/spotifyAPI"

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
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        const fetchPlaylists = async () => {
            const genres = ["rock", "hiphop", "french_variety", "hiphop"]
            const promises = genres.map((genre) => getPlaylistsByGenre(genre))
            const playlistsByGenre = await Promise.all(promises)

            const allPlaylists = playlistsByGenre.reduce((acc, playlists) => {
                return acc.concat(playlists)
            }, [])

            setPlaylists(allPlaylists)
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
                    {playlists.map((playlist) => (
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
