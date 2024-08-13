import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Role } from '../shared/roles/Role';
import { Skill } from '../shared/skills/Skill';

const ClosedRequests = ({ tlId }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/tl/closedJobRequests/${tlId}`);
                setRequests(response.data);
            } catch (err) {
                setError('Failed to fetch closed job requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [tlId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="text-left mb-4">Closed Job Requests</h2>
            <br/>
            {requests.length === 0 ? (
                <p className="text-center">No requests closed yet</p>
            ) : (
            <table className="table table-striped table-bordered" text-align="Left">
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Created Date</th>
                        <th>Role ID</th>
                        <th>Description</th>
                        <th>Skill 1 ID</th>
                        <th>Skill 2 ID</th>
                        <th>Skill 3 ID</th>
                        <th>Vacancies</th>
                        <th>Filled</th>
                        <th>Pending</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request.requestId}>
                            <td>{request.requestId}</td>
                            <td>{new Date(request.createdDate).toLocaleDateString()}</td>
                            <td>{<Role id={request.roleId}/>}</td>
                            <td>{request.description}</td>
                            <td>{<Skill id={request.skill1Id}/> }</td>
                            <td>{<Skill id={request.skill2Id}/> }</td>
                            <td>{<Skill id={request.skill3Id}/> }</td>
                            <td>{request.vacancies}</td>
                            <td>{request.vacancies}</td>
                            <td>0</td>
                            <td>{'Job Request fulfilled!'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default ClosedRequests;
