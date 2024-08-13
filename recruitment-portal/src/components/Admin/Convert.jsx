import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Role } from '../shared/roles/Role';
import { Skill } from '../shared/skills/Skill';

const ConvertPage = () => {
    const [candidates, setCandidates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/admin/getAllCandidates');
                console.log(response.data);
                setCandidates(response.data);
            } catch (error) {
                console.error('Error fetching candidates', error);
            }
        };

        fetchCandidates();
    }, []);

    const handleAddCandidate = (candidate) => {
        navigate('/admin/create', { state: { candidate } });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div style={{ backgroundColor: "#E3F2FD" }} className="card-header text-#333333">
                            <h4>Pending Employee List</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Phone No.</th>
                                        <th>Email</th>
                                        <th>Skill 1</th>
                                        <th>Skill 2</th>
                                        <th>Skill 3</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.map(candidate => (
                                        <tr key={candidate.candidateId}>
                                            <td>{candidate.name}</td>
                                            <td>{<Role id={candidate.roleId} />}</td>
                                            <td>{candidate.phoneNo}</td>
                                            <td>{candidate.email}</td>
                                            <td>{<Skill id={candidate.skill1Id} />}</td>
                                            <td>{<Skill id={candidate.skill2Id} />}</td>
                                            <td>{<Skill id={candidate.skill3Id} />}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleAddCandidate(candidate)}
                                                >
                                                    Add
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConvertPage;
