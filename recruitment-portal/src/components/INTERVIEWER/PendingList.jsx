import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Table, Modal } from 'react-bootstrap';
import { Role } from '../shared/roles/Role';
import { Skill } from '../shared/skills/Skill';

const PendingInterviewsPage = () => {
    const [candidates, setCandidates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('http://localhost:9090/candidates/not-completed');
                setCandidates(response.data);
            } catch (error) {
                console.error('Error fetching candidates', error);
            }
        };

        fetchCandidates();
    }, []);

    const handleStatusChange = (candidateId) => {
        setSelectedCandidate(candidateId);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:9090/candidates/${selectedCandidate}/assessment-status`, null, {
                params: { assessmentStatus: status }
            });

            const response = await axios.get('http://localhost:9090/candidates/not-completed');
            setCandidates(response.data);

            window.alert('Assessment status updated successfully');

            setShowModal(false);
        } catch (error) {
            console.error('Error updating assessment status', error);
            window.alert('Error updating assessment status');
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Header style={{ backgroundColor: "#E3F2FD" }} className="text-#333333">
                            <h4>Pending Interviews</h4>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role ID</th>
                                        <th>Skill 1</th>
                                        <th>Skill 2</th>
                                        <th>Skill 3</th>
                                        <th>Meeting Link</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.length > 0 ? (
                                        candidates.map(candidate => (
                                            <tr key={candidate.candidateId}>
                                                <td>{candidate.candidateId}</td>
                                                <td>{candidate.name}</td>
                                                <td>{candidate.email}</td>
                                                <td>{candidate.phoneNo}</td>
                                                <td><Role id={candidate.roleId} /></td>
                                                <td><Skill id={candidate.skill1Id} /></td>
                                                <td><Skill id={candidate.skill2Id} /></td>
                                                <td><Skill id={candidate.skill3Id} /></td>
                                                <td>{candidate.interviewMeetLink}</td>
                                                <td>
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => handleStatusChange(candidate.candidateId)}
                                                    >
                                                        Update Status
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center">No pending interviews</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Assessment Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-around">
                        <Button
                            variant="success"
                            onClick={() => setStatus('y')}
                        >
                            Selected
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => setStatus('n')}
                        >
                            Not Selected
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PendingInterviewsPage;
