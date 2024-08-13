import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../style/NavTemplate.css';

const NavbarC = ({ role, setIsLogged }) => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLogged({ id: '', role: '', authenticated: false });
        navigate('/home');
    }

    useEffect(() => {

        const fetchTitle = async () => {
            try {

                if (role) {
                    switch (role) {
                        case 'admin':
                            setTitle('Admin Portal');
                            break;
                        case 'PM':
                            setTitle('Project Manager Portal');
                            break;
                        case 'HR':
                            setTitle('Human Resource Portal');
                            break;
                        case 'TL':
                            setTitle('Team Lead Portal');
                            break;
                        case 'INTERVIEWER':
                            setTitle('Interviewer Portal');
                            break;
                        default:
                            setTitle('Employee Recruitment Portal');
                            break;
                    }
                } else {
                    setTitle('Employee Recruitment Portal');
                }
            } catch (error) {
                console.error('Error updating title:', error); // Handle any errors
            }
        };

        fetchTitle();
    }, [role]);

    return (
        <header className="header">
            <div className="header-left">
                <a href="/" className="logo">
                    <img
                        src="https://cpl.thalesgroup.com/sites/default/files/content/partners/logo/2024-07/Mindgate_Logo.png"
                        alt="Logo"
                        className="logo-image"
                    />
                    <span className="dashboard-title">{title}</span>
                </a>
            </div>

            <div className="header-right">
                <nav className="navbar">
                    {role === 'admin' && (
                        <>
                            <Link to="/admin/employee-details">Employees</Link>
                            <Link to="/admin/convert">Convert</Link>
                            <Link to="/admin/create">Create</Link>
                        </>
                    )}
                    {role === 'PM' && (
                        <>
                            <Link to="/PM/active">Active</Link>
                            <Link to="/PM/pending">Pending</Link>
                            <Link to="/PM/closed">Closed</Link>
                        </>
                    )}
                    {role === 'HR' && (
                        <>
                            <Link to="/HR/active">Active</Link>
                            <Link to="/HR/closed">Closed</Link>
                            <Link to="/HR/candidates-process">Selection</Link>
                            <Link to="/HR/candidates-new">New</Link>
                        </>
                    )}
                    {role === 'TL' && (
                        <>
                            <Link to="/TL/create">Create</Link>
                            <Link to="/TL/active">Active</Link>
                            <Link to="/TL/closed">Closed</Link>
                            <Link to="/TL/status">Status</Link>
                        </>
                    )}
                    {role === 'INTERVIEWER' && (
                        <>
                            <Link to="/INTERVIEWER/pending-interviews">Pending</Link>
                            <Link to="/INTERVIEWER/completed-interviews">Completed</Link>
                        </>
                    )}
                </nav>
                {role && (
                    <button className="logout-button" onClick={handleLogout}>
                        <span className="material-symbols-outlined">logout</span>
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
};


export default NavbarC;