// AllRoles.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AllRoles = ({ selectedRole, setSelectedRole }) => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/role/');
                if (response.data) {
                    setRoles(response.data);
                } else {
                    console.log('No data received');
                }
            } catch (err) {
                console.error('Error fetching roles:', err);
            }
        };

        fetchRoles();
    }, []);

    return (
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
                    {roles.length > 0 ? (
                        roles.map(role => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))
                    ) : (
                        <option value="">No roles available</option>
                    )}
                </select>
            </div>
        </div>
    );
};
