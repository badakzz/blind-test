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
    console.log("currentsong", song.name, song.artist)
    if (!song || !song.previewUrl) {
        console.error("Invalid song or song.previewUrl is not defined.")
        return
    }
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
        if (nextIndex < 10 && trackPreviews[nextIndex]) {
            // Wait for 5 seconds before playing the next track
            setTimeout(() => {
                startPlayback(trackPreviews[nextIndex], trackPreviews)
            }, 5000)
        } else {
            // Game is over, handle this as needed
        }
    }
}

export const normalizeAnswer = (text) => {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
}

export const calculateLevenshteinDistance = (a, b) => {
    const matrix = []

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i]
    }

    for (let i = 0; i <= a.length; i++) {
        matrix[0][i] = i
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1]
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                )
            }
        }
    }

    return matrix[b.length][a.length]
}

export const calculateAnswerSimilarity = (a, b) => {
    const distance = calculateLevenshteinDistance(a, b)
    const longestLength = Math.max(a.length, b.length)
    return (longestLength - distance) / longestLength
}
