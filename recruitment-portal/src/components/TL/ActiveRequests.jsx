import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Skill } from '../shared/skills/Skill';
import { Role } from '../shared/roles/Role';

const ActiveRequests = ({ tlId }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null); // Track which request is being edited
    const [newDescription, setNewDescription] = useState({});
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/tl/activeJobRequests/${tlId}`);
                setRequests(response.data);
            } catch (err) {
                setError('Failed to fetch active job requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [tlId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tableRef.current && !tableRef.current.contains(event.target)) {
                // If the click is outside the table, and if there is an editing row, cancel edit
                if (editingId !== null) {
                    setEditingId(null);
                    setNewDescription({});
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [editingId]);

    const handleEdit = (requestId) => {
        setEditingId(requestId);
        // Initialize the newDescription state with the current description of the request
        setNewDescription(prev => ({ ...prev, [requestId]: requests.find(r => r.requestId === requestId).description }));
    };

    const handleChange = (requestId, event) => {
        // Update the newDescription state as the user types
        setNewDescription(prev => ({ ...prev, [requestId]: event.target.value }));
    };

    const handleSave = async (requestId) => {
        try {
            await axios.put(`http://localhost:9090/api/tl/updateJobDescription/${requestId}`, {
                description: newDescription[requestId]
            });
            // Update local state to reflect the changes
            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request.requestId === requestId
                        ? { ...request, description: newDescription[requestId] }
                        : request
                )
            );
            setEditingId(null);
            setNewDescription({});
            alert('Description updated successfully!');
        } catch (error) {
            console.error('Error updating description:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="text-left mb-4">Active Job Requests</h2>
            <br/>
            {requests.length === 0 ? (
                <p className="text-center">No pending requests</p>
            ) : (
                <table className="table table-striped table-bordered" ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Created Date</th>
                            <th>Role ID</th>
                            <th>Description</th>
                            <th>Skill 1</th>
                            <th>Skill 2</th>
                            <th>Skill 3</th>
                            <th>Vacancies</th>
                            <th>Filled</th>
                            <th>Pending</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request.requestId}>
                                <td>{request.requestId}</td>
                                <td>{new Date(request.createdDate).toLocaleDateString()}</td>
                                <td>{<Role id={request.roleId}/>}</td>
                                <td>
                                    {editingId === request.requestId ? (
                                        <input
                                            type="text"
                                            value={newDescription[request.requestId] || ''}
                                            onChange={(e) => handleChange(request.requestId, e)}
                                            autoFocus
                                        />
                                    ) : (
                                        request.description
                                    )}
                                </td>
                                <td>{<Skill id={request.skill1Id}/> }</td>
                                <td>{<Skill id={request.skill2Id}/> }</td>
                                <td>{<Skill id={request.skill3Id}/> }</td>
                                <td>{request.vacancies}</td>
                                <td>{request.filled}</td>
                                <td>{request.pending}</td>
                                <td>{request.jrLevel === 0 ? 'Being Handled by PM' : 'Forwarded to HR'}</td>
                                <td>
                                    {editingId === request.requestId ? (
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleSave(request.requestId)}
                                        >
                                            <i>Save</i> 
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-info"
                                            onClick={() => handleEdit(request.requestId)}
                                        >
                                            <i>Edit Description</i>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ActiveRequests;
    