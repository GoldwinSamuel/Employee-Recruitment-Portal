import axios from 'axios';
import { useEffect, useState } from 'react';

export function NewCandidate() {
    const [candidate, setCandidate] = useState({
        name: '',
        email: '',
        phoneNo: '',
        roleId: '',
        skill1Id: '',
        skill2Id: '',
        skill3Id: '',
    });
    const [roleList, setRoleList] = useState([]);
    const [skillList, setSkillList] = useState([]);

    useEffect(() => {
        const fetchRoleList = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/role/');
                setRoleList(response.data);
            } catch (err) {
                console.log(err);
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
                console.log(err);
            }
        };
        fetchSkillList();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCandidate((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreate = async (event) => {
        event.preventDefault(); 
        try {
            const URL = `http://localhost:9090/api/hr/newcandidate`;
            const response = await axios.post(URL, candidate);
            alert("New Employee Added");
            console.log(response.data); 
        } catch (err) {
            console.error(err); 
        }
    };

    return (
        <div className="container-fluid d-flex flex-column justify-content-center w-75">
            <div className="border p-4 rounded">
                <h3 className="alert alert-primary">Add New Candidate</h3>
                <hr />
                <form onSubmit={handleCreate}>
                    <label>Enter Candidate Name:</label> <br />
                    <input
                        name="name"
                        value={candidate.name}
                        onChange={handleChange}
                        type="text"
                        className="form-control form-control-lg"
                    />
                    <label>Enter Email:</label> <br />
                    <input
                        name="email"
                        value={candidate.email}
                        onChange={handleChange}
                        type="email"
                        className="form-control form-control-lg"
                    />
                    <label>Enter Phone Number:</label> <br />
                    <input
                        name="phoneNo"
                        value={candidate.phoneNo}
                        onChange={handleChange}
                        type="tel"
                        pattern="[+]{1}[0-9]{11,14}"
                        required
                        className="form-control form-control-lg"
                    />
                    <label>Enter Role:</label> <br />
                    <select
                        name="roleId"
                        value={candidate.roleId}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                    >
                        <option value="">--Select Role--</option>
                        {roleList.map((role) => (
                            <option key={role.roleId} value={role.roleId}>
                                {role.empRole}
                            </option>
                        ))}
                    </select>
                    <label>Enter Skill 1:</label> <br />
                    <select
                        name="skill1Id"
                        value={candidate.skill1Id}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                    >
                        <option value="">--Select Skill 1--</option>
                        {skillList.map((skill) => (
                            <option key={skill.skillId} value={skill.skillId}>
                                {skill.skill}
                            </option>
                        ))}
                    </select>
                    <label>Enter Skill 2:</label> <br />
                    <select
                        name="skill2Id"
                        value={candidate.skill2Id}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                    >
                        <option value="">--Select Skill 2--</option>
                        {skillList.map((skill) => (
                            <option key={skill.skillId} value={skill.skillId}>
                                {skill.skill}
                            </option>
                        ))}
                    </select>
                    <label>Enter Skill 3:</label> <br />
                    <select
                        name="skill3Id"
                        value={candidate.skill3Id}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                    >
                        <option value="">--Select Skill 3--</option>
                        {skillList.map((skill) => (
                            <option key={skill.skillId} value={skill.skillId}>
                                {skill.skill}
                            </option>
                        ))}
                    </select>
                    <div className="d-flex justify-content-center">
                        <input
                            type="submit"
                            value="Create"
                            className="btn btn-primary btn-lg w-25"
                        />
                        &nbsp;&nbsp;
                        <input
                            type="reset"
                            value="Reset"
                            className="btn btn-primary btn-lg w-25"
                            onClick={() => setCandidate({
                                name: '',
                                email: '',
                                phoneNo: '',
                                roleId: '',
                                skill1Id: '',
                                skill2Id: '',
                                skill3Id: '',
                            })}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
