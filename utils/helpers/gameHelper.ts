export const startGame = async (
    setGameStarted,
    trackPreviews,
    startPlayback
) => {
    setGameStarted(true)

    // Play the first track
    startPlayback(trackPreviews[0], trackPreviews)
}

export const startPlayback = (song, trackPreviews) => {
    const audio = new Audio(song.previewUrl)
    audio.volume = 0.2 // Set volume to the maximum
    audio.play().catch((error) => {
        console.error("Failed to play the track:", error)
    })
    audio.onerror = (error) => {
        console.error(
            "An error occurred while trying to play the audio:",
            error
        )
    }
    console.log("trackPreviews", trackPreviews)
    // When the track ends, play the next one (if there are any left)
    audio.onended = () => {
        const currentIndex = trackPreviews.indexOf(song)
        const nextIndex = currentIndex + 1

        // Stop after 10 tracks
        if (nextIndex < 10) {
            // Wait for 5 seconds before playing the next track
            setTimeout(() => {
                startPlayback(trackPreviews[nextIndex], trackPreviews)
            }, 5000)
        } else {
            // Game is over, handle this as needed
        }
    }
}
