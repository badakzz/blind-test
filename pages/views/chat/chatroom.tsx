import React, { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { User } from "../../../utils/types/User"
import { GetServerSideProps } from "next"
import { withSession } from "../../../utils/helpers/ironSessionHelper"
import {
    CreateOrJoinChatroom,
    ChatMessagesContainer,
    PlaylistSelectionModal,
} from "../../../components"
import { getMultipleRandomTrackPreviewsFromPlaylist } from "../../../lib/spotify/spotifyAPI"
import {
    startGame,
    startPlayback,
    normalizeAnswer,
    analyzeAnswerAndAttributeScore,
} from "../../../utils/helpers"
import Scoreboard from "../../../components/Scoreboard"

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
    const [showPlaylistModal, setShowPlaylistModal] = useState<boolean>(false)
    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0)
    const [currentChatroomId, setCurrentChatroomId] = useState<string>(null)
    const [currentSongName, setCurrentSongName] = useState<string>(null)
    const [currentArtistName, setCurrentArtistName] = useState<string>(null)
    const [isGameStopped, setIsGameStopped] = useState<boolean>(false)
    const [isCreator, setIsCreator] = useState<boolean>(false)
    const [isGameStarting, setIsGameStarting] = useState<boolean>(false)

    const audioRef = useRef(typeof window === "undefined" ? null : new Audio())

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
            newSocket.off("chatroomCreated")
            newSocket.disconnect()
        }
    }, [])

    console.log("isGameStarting", isGameStarting)
    useEffect(() => {
        if (socket && isGameStarting) {
            if (!isCreator) {
                socket.on("gameStarted", (trackPreviews) => {
                    console.log("Received gameStarted event")
                    setTrackPreviews(trackPreviews)
                    const newAudio = startGame(
                        setGameStarted,
                        trackPreviews,
                        startPlayback,
                        setCurrentSongIndex,
                        isGameStopped,
                        audioRef.current
                    )
                    if (newAudio) {
                        setCurrentSongIndex(0)
                    }
                    setIsGameStarting(false)
                })
                return () => {
                    socket.off("gameStarted")
                }
            } else {
                setTrackPreviews(trackPreviews)
                const newAudio = startGame(
                    setGameStarted,
                    trackPreviews,
                    startPlayback,
                    setCurrentSongIndex,
                    isGameStopped,
                    audioRef.current
                )
                if (newAudio) {
                    setCurrentSongIndex(0)
                }
                setIsGameStarting(false)
            }
        }
    }, [socket, isGameStarting])

    // useEffect(() => {
    //     console.log("1")
    //     if (socket) {
    //         console.log("2")
    //         if (!isCreator && gameStarted) {
    //             console.log("3")
    //             socket.on("trackPreviewsServer", (trackPreviews) => {
    //                 console.log("setting from server", trackPreviews)
    //                 setTrackPreviews(trackPreviews)
    //             })
    //         }
    //         return () => {
    //             socket.off("trackPreviewsServer")
    //         }
    //     }
    // }, [socket, isCreator, gameStarted])

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

                const normalizedMGuessWords = normalizeAnswer(
                    msg.message
                ).split(" ")
                const normalizedParsedSongNameWords =
                    normalizeAnswer(currentSongName).split(" ")
                const normalizedParsedArtistNameWords =
                    normalizeAnswer(currentArtistName).split(" ")

                const answer = analyzeAnswerAndAttributeScore(
                    normalizedParsedSongNameWords,
                    normalizedMGuessWords,
                    normalizedParsedArtistNameWords
                )
                if (answer.points > 0) {
                    console.log("answer", answer)
                    socket.emit(
                        "updateScore",
                        currentChatroomId,
                        user.id,
                        answer.points,
                        answer.correctGuessType,
                        currentSongName,
                        currentArtistName
                    )
                }
            })

            socket.on("scoreUpdated", ({ user, correctGuessType }) => {
                console.log("userhere", user)
                const guessMessage = {
                    author: "System",
                    message: `${user.user_name} has correctly guessed the ${correctGuessType}!`,
                }
                console.log(guessMessage)
                socket.emit("chatMessage", guessMessage)
            })
            return () => {
                socket.off("chatMessage")
                socket.off("scoreUpdated")
            }
        }
    }, [socket, currentSongName, currentArtistName])

    useEffect(() => {
        if (socket) {
            socket.on("gameOver", (finalScores, winnerId) => {
                setIsGameStopped(true)

                if (audioRef.current && audioRef.current instanceof Audio) {
                    audioRef.current.pause()
                } else {
                    console.error(
                        "Audio object is not defined or not an instance of Audio."
                    )
                }
                console.log("Final scores:", finalScores)
                console.log("Winner:", winnerId)
            })
            return () => {
                socket.off("gameOver")
            }
        }
    }, [socket])

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
            setIsCreator(true)
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
                setIsCreator(false) // Set isCreator to false
                setIsGameStarting(true) // Set isGameStarting to true
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
        console.log("start")
        socket.emit("startGame", currentChatroomId, trackPreviews)
        setIsGameStarting(true)
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
                    {isCreator ? (
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
                    ) : (
                        "Waiting for the host to launch the game"
                    )}
                </>
            )}
            {playlistId && !gameStarted && (
                <button
                    onClick={() => {
                        handleStartGame()
                        setGameStarted(true)
                    }}
                >
                    Start Game
                </button>
            )}
            {console.log({ gameStarted: gameStarted })}
            {gameStarted && (
                <ChatMessagesContainer
                    messages={messages}
                    users={users}
                    socket={socket}
                />
            )}
            {isGameStopped && <Scoreboard chatroomId={currentChatroomId} />}
        </div>
    )
}

export default Chatroom
