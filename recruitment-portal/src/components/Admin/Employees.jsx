import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Role } from '../shared/roles/Role';
import { Skill } from '../shared/skills/Skill';

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/admin/getAllEmployees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleViewEmployee = (employee) => {
        navigate('/employee-details', { state: { employee } });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div style={{backgroundColor: "#E3F2FD"}} className="card-header text-#333333">
                            <h4>Employee Table</h4>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map(employee => (
                                        <tr key={employee.employeeId}>
                                            <td>{employee.name}</td>
                                            <td>{<Role id={employee.roleId}/>}</td>
                                            <td>{employee.phoneNo}</td>
                                            <td>{employee.email}</td>
                                            <td>{<Skill id={employee.skill1Id} />}</td>
                                            <td>{<Skill id={employee.skill2Id} />}</td>
                                            <td>{<Skill id={employee.skill3Id} />}</td>
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

export default EmployeePage;
