import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function Techinical({ sfi, as, cs, id, onUpdate }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [meetLink, setMeetLink] = useState('');
    const [modalError, setModalError] = useState(null);

    const getButtonTextAndVariant = () => {
        if (sfi === null && as === null && cs === null) {
            return { text: "Send To Technical Interview", variant: "light", disabled: false };
        } else if (sfi === 'y' && as === null && cs === null) {
            return { text: "Technical Interview", variant: "warning", disabled: true };
        } else if (sfi === 'y' && as === 'y' && cs === null) {
            return { text: "Selected at Technical Interview", variant: "success", disabled: true };
        } else if (sfi === 'n' || as === 'n' || cs === 'n') {
            return { text: "Removed from Interview", variant: "danger", disabled: true };
        } else if (sfi === 'y' && as === 'y' && cs === 'y') {
            return { text: "Selected at Technical Interview", variant: "success", disabled: true };
        } else {
            return { text: "Unknown Status", variant: "secondary", disabled: true };
        }
    };

    const { text, variant, disabled } = getButtonTextAndVariant();

    const handleClick = async () => {
        if (text === "Send To Technical Interview") {
            setShowModal(true);
        }
    };

    const handleModalSubmit = async () => {
        if (!meetLink) {
            setModalError("MeetLink is required.");
            return;
        }

        setLoading(true);
        setModalError(null);

        try {
            await axios.put(`http://localhost:9090/api/candidates/meetLink/${id}`, { "interviewMeetLink": meetLink });
            await axios.put(`http://localhost:9090/api/hr/toInterviewer/${id}`);
            setShowModal(false);
            if (onUpdate) onUpdate();
        } catch (err) {
            setError("Failed to send to technical interview.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant={variant} onClick={handleClick} disabled={disabled}>
                {text}
            </Button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter MeetLink</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formMeetLink">
                            <Form.Label>MeetLink Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Meet Link"
                                value={meetLink}
                                onChange={(e) => setMeetLink(e.target.value)}
                            />
                            {modalError && <p className="text-danger">{modalError}</p>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleModalSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}