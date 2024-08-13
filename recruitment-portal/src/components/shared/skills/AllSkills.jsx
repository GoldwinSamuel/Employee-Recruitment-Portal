// AllSkills.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AllSkills = ({ selectedSkills, setSelectedSkills }) => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/skill/');
                setSkills(response.data);
            } catch (err) {
                console.error('Error fetching skills:', err);
            }
        };

        fetchSkills();
    }, []);

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

    return (
        <div className="form-group row">
            <label className="col-sm-3 col-form-label">Skills (Select up to 3)</label>
            <div className="col-sm-9">
                <div className="d-inline-flex align-items-center">
                    {skills.map(skill => (
                        <div className="form-check form-check-inline" key={skill.id}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`skill-${skill.id}`}
                                checked={selectedSkills.includes(skill.id)}
                                onChange={() => handleSkillToggle(skill.id)}
                            />
                            <label className="form-check-label" htmlFor={`skill-${skill.id}`}>
                                {skill.name}
                            </label>
                        </div>
                    ))}
                </div>
                {selectedSkills.length === 0 && <div className="text-danger">You must select at least one skill.</div>}
                {selectedSkills.length > 3 && <div className="text-danger">You can select up to three skills only.</div>}
            </div>
        </div>
    );
};
