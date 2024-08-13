import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChangeEmployeeStatus = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/tl/activeEmployees');
                setEmployees(response.data);
            } catch (err) {
                setError('Failed to fetch active employees.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleStatusChange = async (empId) => {
        // Show confirmation dialog
        const confirmed = window.confirm("Are you sure you want to change this employee's status to inactive?");
        if (!confirmed) {
            return; // If cancelled, do nothing
        }

        try {
            await axios.put(`http://localhost:9090/api/tl/updateActiveEmployeesStatus/${empId}`, {
                status: 'inactive'
            });
            setEmployees(prevEmployees =>
                prevEmployees.map(employee =>
                    employee.empId === empId
                        ? { ...employee, status: 'inactive' }
                        : employee
                )
            );
        } catch (err) {
            setError('Failed to update employee status.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="text-left mb-4">Active Employees</h2>
            {employees.length === 0 ? (
                <p className="text-center">No active employees</p>
            ) : (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Role ID</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.empId}>
                                <td>{employee.empId}</td>
                                <td>{employee.name}</td>
                                <td>{employee.roleId}</td>
                                <td>{employee.email}</td>
                                <td>
                                    {employee.status === 'active' ? (
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleStatusChange(employee.empId)}
                                        >
                                            Change Status to Inactive
                                        </button>
                                    ) : (
                                        <button className="btn btn-success"  style={{ backgroundColor: '#28a745', borderColor: '#28a745', opacity: 0.90, cursor: 'not-allowed' }} disabled>
                                            Employee Made Inactive!
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

export default ChangeEmployeeStatus;
