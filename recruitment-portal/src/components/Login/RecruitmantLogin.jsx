import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPasswordModal"; 
import NavbarC from "../shared/navbar/NavTemplate";

export function EmployeeLogin({ userLoginSetter }) {
    const [Id, setId] = useState("id", "");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ id: "", password: "" });
    const [showModal, setShowModal] = useState(false); 

    const navigate = useNavigate();

    const handleRefresh = () => {
        setErrors({ id: "", password: "" });
    };

    const handleLogin = (event) => {
        event.preventDefault();

        let isValid = true;
        let newErrors = { id: "", password: "" };
        let loginState = { id: '', role: '', authenticated: false };

        const idPattern = /^MGS(\d+)$/;
        const match = Id.match(idPattern);
        const numericId = match ? match[1] : '';

        if (!Id) {
            newErrors.id = "Employee ID is required.";
            isValid = false;
        } else if (!idPattern.test(Id)) {
            newErrors.id = "Invalid ID";
            isValid = false;
        }
        if (!password) {
            newErrors.password = "Password is required.";
            isValid = false;
        }
        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        let URL = 'http://localhost:9090/employee/login';
        axios.post(URL, { "employeeId": numericId, "password": password })
            .then(s => {
                console.log(s.data);
                if (s.data.result === true) {
                    navigate(`/${s.data.role}`);
                    loginState.id = s.data.empId;
                    loginState.role = s.data.role;
                    loginState.authenticated = s.data.result;
                    userLoginSetter(loginState);
                }
            })
            .catch(e => {
                console.error(e);
                setErrors({ ...errors, password: "Invalid ID or password." });
            });
    };

    return (
        <>
            <NavbarC role={""} />
            <div className="container-fluid d-flex flex-column justify-content-center w-50">
                <div className="border p-4 rounded">
                    <div style={{ backgroundColor: "#E3F2FD" }} className="card-header rounded alert alert-primary text-#333333">
                        <h4>Employee Login</h4>
                    </div>
                    <hr />
                    <form onSubmit={handleLogin}>
                        <label>Enter Employee ID:</label> <br />
                        <input
                            onFocus={handleRefresh}
                            onChange={(event) => setId(event.target.value)}
                            type="text"
                            id="validationTooltipEmployeeId"
                            className="form-control form-control-lg"
                        />
                        {errors.id && <div className="text-danger">{errors.id}</div>}
                        <br />
                        <label>Enter Password:</label> <br />
                        <input
                            onFocus={handleRefresh}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            id="validationTooltipPassword"
                            className="form-control form-control-lg"
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                        <br />
                        <div>
                            <input
                                type="submit"
                                value="Login"
                                className="btn btn-primary btn-lg w-100"
                            />
                        </div>
                    </form>
                    <br />
                    <a href="#" onClick={() => setShowModal(true)}>Forgot/Reset Password?</a>
                </div>
            </div>


            <ForgotPasswordModal show={showModal} handleClose={() => setShowModal(false)} />
        </>
    );
}
