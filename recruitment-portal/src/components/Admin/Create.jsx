import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const CreatePage = () => {
    const initialEmployeeForm = {
        name: '',
        roleId: '',
        phoneNo: '',
        email: '',
        skill1Id: '',
        skill2Id: '',
        skill3Id: ''
    };

    const [employeeForm, setEmployeeForm] = useState(initialEmployeeForm);
    const [roleList, setRoleList] = useState([]);
    const [skillList, setSkillList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchRoleList = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/role/');
                setRoleList(response.data);
            } catch (err) {
                console.error('Failed to fetch roles', err);
            }
        };
        fetchRoleList();
    }, []);

    useEffect(() => {
        const fetchSkillList = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/skill/');
                setSkillList(response.data);
            } catch (err) {
                console.error('Failed to fetch skills', err);
            }
        };
        fetchSkillList();
    }, []);

    useEffect(() => {

        const state = location.state;
        if (state && state.candidate) {
            setEmployeeForm({
                employeeId: state.candidate.candidateId,
                name: state.candidate.name,
                roleId: state.candidate.roleId,
                phoneNo: state.candidate.phoneNo,
                email: state.candidate.email,
                skill1Id: state.candidate.skill1Id,
                skill2Id: state.candidate.skill2Id,
                skill3Id: state.candidate.skill3Id
            });
        }
    }, [location.state]);

    const handleSubmitFromCandidates = async () => {
        try {
            const validEmployeeForm = {
                employeeId: 0,
                name: employeeForm.name || '',
                roleId: parseInt(employeeForm.roleId, 10) || 0,  
                phoneNo: employeeForm.phoneNo || '',
                email: employeeForm.email || '',
                skill1Id: employeeForm.skill1Id || '',
                skill2Id: employeeForm.skill2Id || '',
                skill3Id: employeeForm.skill3Id || ''
            };

            console.log('Submitting employee form:', validEmployeeForm);

            await axios.post('http://localhost:9090/api/admin/create', validEmployeeForm);

            if (employeeForm.employeeId) {
                await axios.delete(`http://localhost:9090/api/admin/delete/${employeeForm.employeeId}`);
            }

            navigate('/admin/convert');
        } catch (error) {
            console.error('Error creating employee from candidate', error);
            alert('Failed to convert candidate to employee');
        }
    };

    return (
        <div className="container-fluid d-flex flex-column justify-content-center w-50">
            <div className="border p-4 rounded">
                <div style={{ backgroundColor: "#E3F2FD" }} className="card-header rounded alert alert-primary text-#333333">
                    <h4>Create Employee</h4>
                </div>
                <hr />
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={employeeForm.name}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Role:</label>
                                <select
                                    className="form-control form-control-lg"
                                    value={employeeForm.roleId}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, roleId: e.target.value })}
                                >
                                    <option value="">-- Select Role --</option>
                                    {roleList.map((role) => (
                                        <option key={role.roleId} value={role.roleId}>
                                            {role.empRole}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Phone No.:</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={employeeForm.phoneNo}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, phoneNo: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    value={employeeForm.email}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Skill 1:</label>
                                <select
                                    className="form-control form-control-lg"
                                    value={employeeForm.skill1Id}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, skill1Id: e.target.value })}
                                >
                                    <option value="">-- Select Skill --</option>
                                    {skillList.map((skill) => (
                                        <option key={skill.skillId} value={skill.skillId}>
                                            {skill.skill}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Skill 2:</label>
                                <select
                                    className="form-control form-control-lg"
                                    value={employeeForm.skill2Id}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, skill2Id: e.target.value })}
                                >
                                    <option value="">-- Select Skill --</option>
                                    {skillList.map((skill) => (
                                        <option key={skill.skillId} value={skill.skillId}>
                                            {skill.skill}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Skill 3:</label>
                                <select
                                    className="form-control form-control-lg"
                                    value={employeeForm.skill3Id}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, skill3Id: e.target.value })}
                                >
                                    <option value="">-- Select Skill --</option>
                                    {skillList.map((skill) => (
                                        <option key={skill.skillId} value={skill.skillId}>
                                            {skill.skill}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className='d-flex flex-row justify-content-center'>
                                <button type="button" className="btn btn-primary btn-lg w-50" onClick={handleSubmitFromCandidates}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
