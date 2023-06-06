import { Modal, Button } from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"

interface Props {
    chatroomId: string
}
const Scoreboard: React.FC<Props> = (chatroomId) => {
    const [show, setShow] = useState(false)
    const [scores, setScores] = useState([])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const getScores = async () => {
        try {
            // Assuming an API endpoint that takes a chatroom ID and returns scores
            const response = await axios.get(
                `/api/scores?chatroomid=${chatroomId}`
            )
            setScores(response.data)
        } catch (error) {
            console.error("Failed to fetch scores: ", error)
        }
    }

    useEffect(() => {
        getScores()
        handleShow()
    }, [])

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Game End Scores</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {scores.map((score, index) => (
                        <p key={index}>
                            {score.playerName}: {score.points}
                        </p>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Scoreboard
