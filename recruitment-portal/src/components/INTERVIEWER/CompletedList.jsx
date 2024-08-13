import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Role } from '../shared/roles/Role';
import { Skill } from '../shared/skills/Skill';

const CompletedInterviewsPage = () => {
    const [completedCandidates, setCompletedCandidates] = useState([]);

    useEffect(() => {
        const fetchCompletedCandidates = async () => {
            try {
                const response = await axios.get('http://localhost:9090/candidates/completed');
                setCompletedCandidates(response.data);
            } catch (error) {
                console.error('Error fetching completed candidates', error);
            }
        };

        fetchCompletedCandidates();
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Header style={{ backgroundColor: "#E3F2FD" }} className="text-#333333">
                            <h4>Completed Interviews</h4>
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
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completedCandidates.length > 0 ? (
                                        completedCandidates.map(candidate => (
                                            <tr key={candidate.candidateId}>
                                                <td>{candidate.candidateId}</td>
                                                <td>{candidate.name}</td>
                                                <td>{candidate.email}</td>
                                                <td>{candidate.phoneNo}</td>
                                                <td><Role id={candidate.roleId} /></td>
                                                <td><Skill id={candidate.skill1Id} /></td>
                                                <td><Skill id={candidate.skill2Id} /></td>
                                                <td><Skill id={candidate.skill3Id} /></td>
                                                <td>{candidate.assessmentStatus=='y'?"Selected":"Not Selected"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">No completed interviews</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CompletedInterviewsPage;
