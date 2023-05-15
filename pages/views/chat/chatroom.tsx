import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import { User } from "../../../utils/types/User"
import { GetServerSideProps } from "next"
import { withSession } from "../../../utils/helpers/ironSessionHelper"
import {
    CreateOrJoinChatroom,
    SendChatMessage,
    PlaylistSelectionModal,
} from "../../../components"
import {
    getAvailableGenres,
    getPlaylistsByGenre,
    getRandomTrackPreviewFromPlaylist,
} from "../../../lib/spotify/spotifyAPI"
import { startGame, startPlayback } from "../../../utils/helpers/gameHelper"

interface ChatroomProps {
    user: User | null
}

export const getServerSideProps: GetServerSideProps = withSession(
    async ({ req, res }) => {
        const user = req.session.get("user")

        if (user) {
            return {
                props: {
                    user: user,
                },
            }
        } else {
            return {
                props: {
                    user: null,
                },
            }
        }
    }
)

const Chatroom: React.FC<ChatroomProps> = ({ user }) => {
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [validatedUsername, setValidatedUsername] = useState(false)
    const [playlistId, setPlaylistId] = useState(null)
    const [trackPreviews, setTrackPreviews] = useState([])
    const [showPlaylistModal, setShowPlaylistModal] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)

    useEffect(() => {
        const pog = async () => await getAvailableGenres()
        pog()
        if (playlistId) {
            const fetchTrackPreviews = async () => {
                const previews = await getRandomTrackPreviewFromPlaylist(
                    playlistId
                )
                setTrackPreviews((prevState) => [...prevState, previews])
            }
            fetchTrackPreviews()
        }
    }, [playlistId])

    useEffect(() => {
        const newSocket = io("http://localhost:3001")
        setSocket(newSocket)

        newSocket.on("chatroomCreated", (chatroomId) => {
            // Display the chatroom link when the room is created
            const currentUrl = window.location.href
            const roomUrl = `${currentUrl}?chatroomId=${chatroomId}`
            alert(
                `Chatroom created! Share this link with others to join: ${roomUrl}`
            )
        })

        newSocket.on("chatMessage", (msg) => {
            setMessages((currentMsg) => [...currentMsg, msg])
        })

        newSocket.on("users", (users) => {
            setUsers(users)
        })

        return () => {
            newSocket.disconnect()
        }
    }, [])

    const handleCreateRoom = (username) => {
        let finalUsername = username

        if (user) {
            finalUsername = user.username
        } else if (!username) {
            finalUsername = `guest${users.length + 1}`
        }

        if (finalUsername) {
            socket.emit("createRoom", username)
            setValidatedUsername(true)
        }
    }

    const handleJoinRoom = (username: string, chatroomId: string) => {
        if (chatroomId) {
            let finalUsername = username

            if (user) {
                finalUsername = user.username
            } else if (!username) {
                finalUsername = `guest${users.length + 1}`
            }
            if (finalUsername) {
                setValidatedUsername(true)
                socket.emit("joinRoom", username, chatroomId)
            }
        }
        console.log("chatroomUser", user)
    }

    // const handleGenreSelection = async (genre) => {
    //     const playlists = await getPlaylistsByGenre(genre)
    //     // Display playlists in a modal or UI element and let the user select one
    //     // For example, you could use the user's selection to set the playlist ID:
    //     setPlaylistId(userSelectedPlaylistId)
    // }

    const handleOpenPlaylistModal = () => {
        setShowPlaylistModal(true)
    }

    const handleClosePlaylistModal = () => {
        setShowPlaylistModal(false)
    }

    const handlePlaylistSelected = (playlistId) => {
        setPlaylistId(playlistId)
    }

    const handleStartGame = () => {
        startGame(setGameStarted, trackPreviews, startPlayback)
    }

    return (
        <div>
            <h1>Chatroom</h1>
            {!validatedUsername && (
                <CreateOrJoinChatroom
                    user={user}
                    onCreate={handleCreateRoom}
                    onJoin={handleJoinRoom}
                />
            )}
            {validatedUsername && !playlistId && (
                <>
                    <button onClick={handleOpenPlaylistModal}>
                        Select Playlist
                    </button>
                    <PlaylistSelectionModal
                        show={showPlaylistModal}
                        onPlaylistSelected={handlePlaylistSelected}
                        onModalClose={handleClosePlaylistModal}
                    />
                </>
            )}
            {playlistId && !gameStarted && (
                <button onClick={handleStartGame}>Start Game</button>
            )}
            {playlistId && gameStarted && (
                <SendChatMessage
                    messages={messages}
                    users={users}
                    socket={socket}
                />
            )}
        </div>
    )
}

export default Chatroom
