import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const JobRequestForm = ({ tlId }) => {
    // State variables for roles, skills, and form data
    const [roles, setRoles] = useState([]);
    const [skills, setSkills] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [jobDescription, setJobDescription] = useState('');
    const [positions, setPositions] = useState(1);

    // Fetch roles and skills on component mount
    useEffect(() => {
        const fetchRolesAndSkills = async () => {
            try {
                // Fetch roles
                const rolesResponse = await axios.get('http://localhost:9090/api/role/');
                setRoles(rolesResponse.data);
                console.log('Roles:', rolesResponse.data);

                // Fetch skills
                const skillsResponse = await axios.get('http://localhost:9090/api/skill/');
                setSkills(skillsResponse.data);
                console.log('Skills:', skillsResponse.data);
            } catch (err) {
                console.error('Error fetching roles and skills:', err);
            }
        };

        fetchRolesAndSkills();
    }, []);

    // Handle skill toggle
    const handleSkillToggle = (skillId) => {
        setSelectedSkills((prevSkills) => {
            if (prevSkills.includes(skillId)) {
                return prevSkills.filter(id => id !== skillId);
            } else if (prevSkills.length < 3) {
                return [...prevSkills, skillId];
            }
            return prevSkills;
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedSkills.length < 1) {
            alert('You must select at least one skill.');
            return;
        }

        // Prepare skill IDs for the backend
        const [skill1Id, skill2Id, skill3Id] = [
            selectedSkills[0] || null,
            selectedSkills[1] || null,
            selectedSkills[2] || null
        ];

        try {
            await axios.post('http://localhost:9090/api/tl/createJobRequest', {
                roleId: selectedRole,
                description: jobDescription,
                skill1Id,
                skill2Id,
                skill3Id,
                vacancies: positions,
                filled: 0,
                pending: positions,
                createdDate: new Date(),
                tlId
            });
            alert('Job request created successfully!');
        } catch (error) {
            console.error('Error submitting job request', error);
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-left mb-5">Create a New Job Request</h3>
            <form onSubmit={handleSubmit}>
                {/* Job Role Dropdown */}
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="jobRole">Job Role</label>
                    <div className="col-sm-9">
                        <select
                            id="jobRole"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(Number(e.target.value))}
                            required
                            className="form-control"
                        >
                            <option value="">Select a role</option>
                            {roles.length > 0 ? (
                                roles.map(role => (
                                    <option key={role.roleId} value={role.roleId}>
                                        {role.empRole}
                                    </option>
                                ))
                            ) : (
                                <option value="">No roles available</option>
                            )}
                        </select>
                    </div>
                </div>
                <br/>

                {/* Job Description Textarea */}
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="jobDescription">Job Description</label>
                    <div className="col-sm-9">
                        <textarea
                            id="jobDescription"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            required
                            className="form-control"
                            rows="4"
                        />
                    </div>
                </div>
                <br/>

                {/* Skills Checkboxes */}
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Skills (Select minimum 1 and maximum 3)</label>
                    <div className="col-sm-9">
                        <div className="d-inline-flex align-items-center">
                            {skills.length > 0 ? (
                                skills.map(skill => (
                                    <div className="form-check form-check-inline" key={skill.skillId}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`skill-${skill.skillId}`}
                                            checked={selectedSkills.includes(skill.skillId)}
                                            onChange={() => handleSkillToggle(skill.skillId)}
                                        />
                                        <label className="form-check-label" htmlFor={`skill-${skill.skillId}`}>
                                            {skill.skill}
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <div>No skills available</div>
                            )}
                        </div>
                    </div>
                </div>
                <br/>

                {/* Number of Positions Input */}
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="positions">Number of Positions</label>
                    <div className="col-sm-9">
                        <input
                            type="number"
                            id="positions"
                            value={positions}
                            onChange={(e) => setPositions(Number(e.target.value))}
                            min="1"
                            required
                            className="form-control form-control-lg"
                        />
                    </div>
                </div>
                <br/>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-lg mt-3">
                    Submit
                </button>
            </form>
        </div>
    );
};
