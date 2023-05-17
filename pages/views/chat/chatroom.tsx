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
import { getMultipleRandomTrackPreviewsFromPlaylist } from "../../../lib/spotify/spotifyAPI"
import {
    startGame,
    startPlayback,
    calculateAnswerSimilarity,
    normalizeAnswer,
} from "../../../utils/helpers/gameHelper"

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
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [gameStartTime, setGameStartTime] = useState(null)
    const [currentChatroomId, setCurrentChatroomId] = useState(null)
    const [currentSongName, setCurrentSongName] = useState(null)
    const [currentArtistName, setCurrentArtistName] = useState(null)

    useEffect(() => {
        if (playlistId) {
            const fetchTrackPreviews = async () => {
                const previews =
                    await getMultipleRandomTrackPreviewsFromPlaylist(
                        playlistId,
                        10
                    )
                setTrackPreviews((prevState) => [...prevState, ...previews]) // spread the contents of previews
            }
            fetchTrackPreviews()
        }
    }, [playlistId])

    useEffect(() => {
        if (trackPreviews && trackPreviews[currentSongIndex]) {
            setCurrentSongName(trackPreviews[currentSongIndex].name)
            setCurrentArtistName(trackPreviews[currentSongIndex].artist)
        }
        console.log("currentSongIndex", currentSongIndex)
    }, [trackPreviews, currentSongIndex])

    useEffect(() => {
        if (socket) {
            // Clean up old event listeners
            socket.off("chatMessage")
            socket.off("scoreUpdated")

            // Set up new event listeners
            socket.on("chatMessage", (msg) => {
                setMessages((currentMsg) => [...currentMsg, msg])

                const normalizedMessage = normalizeAnswer(msg.message)

                const nameSimilarity = calculateAnswerSimilarity(
                    normalizedMessage,
                    normalizeAnswer(currentSongName)
                )

                const artistSimilarity = calculateAnswerSimilarity(
                    normalizedMessage,
                    normalizeAnswer(currentArtistName)
                )

                const minAccuracy = 0.9
                let points = 0
                let correctGuess = false
                let correctGuessType = ""

                if (nameSimilarity >= minAccuracy) {
                    points += 0.5
                    correctGuess = true
                    correctGuessType = "song name"
                }

                if (artistSimilarity >= minAccuracy) {
                    points += 0.5
                    correctGuess = true
                    correctGuessType = "artist name"
                }

                if (points > 0) {
                    socket.emit(
                        "updateScore",
                        currentChatroomId,
                        user.id,
                        points,
                        correctGuessType
                    )
                }
            })

            socket.on("scoreUpdated", ({ user, correctGuessType }) => {
                const guessMessage = `${user} has correctly guessed the ${correctGuessType}!`
                console.log(guessMessage)
                setMessages((currentMsg) => [
                    ...currentMsg,
                    { user: "System", text: guessMessage },
                ])
            })
        }
    }, [socket, currentSongName, currentArtistName])

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
            setCurrentChatroomId(chatroomId) // Set the current chatroom id
        })

        newSocket.on("users", (users) => {
            setUsers(users)
        })

        return () => {
            newSocket.disconnect()
        }
    }, [])

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
            setCurrentChatroomId(chatroomId) // Set the current chatroom id
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
    }

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
        startGame(
            setGameStarted,
            trackPreviews,
            startPlayback,
            setCurrentSongIndex
        )
        setGameStartTime(Date.now())
        setCurrentSongIndex(0)
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
