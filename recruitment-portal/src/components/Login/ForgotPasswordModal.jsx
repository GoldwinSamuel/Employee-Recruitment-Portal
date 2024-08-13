import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is imported

const ForgotPasswordModal = ({ show, handleClose }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        lowerCase: false,
        upperCase: false,
        number: false,
        symbol: false,
    });

    const checkPasswordStrength = (password) => {
        setPasswordStrength({
            length: password.length >= 8,
            lowerCase: /[a-z]/.test(password),
            upperCase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await axios.post('http://localhost:9090/employee/forgot-password', null, {
                params: { email }
            });
            setStep(2);
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await axios.post('http://localhost:9090/employee/reset-password', null, {
                params: { otp, newPassword, confirmPassword }
            });
            setSuccess('Your password has been reset.');
            setStep(1); 
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Failed to reset password. Please check your OTP and try again.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{step === 1 ? 'Forgot Password' : 'Reset Password'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                {step === 1 ? (
                    <Form onSubmit={handleEmailSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Registered Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Send OTP
                        </Button>
                    </Form>
                ) : (
                    <Form onSubmit={handleResetSubmit}>
                        <Form.Group controlId="formOtp">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the OTP sent to your email"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    checkPasswordStrength(e.target.value);
                                }}
                                required
                            />
                            <Form.Text className="text-muted">
                                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                    <li style={{ color: passwordStrength.length ? 'green' : 'red' }}>
                                        {passwordStrength.length ? '✓ ' : '✗ '}At least 8 characters
                                    </li>
                                    <li style={{ color: passwordStrength.lowerCase ? 'green' : 'red' }}>
                                        {passwordStrength.lowerCase ? '✓ ' : '✗ '}At least one lowercase letter
                                    </li>
                                    <li style={{ color: passwordStrength.upperCase ? 'green' : 'red' }}>
                                        {passwordStrength.upperCase ? '✓ ' : '✗ '}At least one uppercase letter
                                    </li>
                                    <li style={{ color: passwordStrength.number ? 'green' : 'red' }}>
                                        {passwordStrength.number ? '✓ ' : '✗ '}At least one number
                                    </li>
                                    <li style={{ color: passwordStrength.symbol ? 'green' : 'red' }}>
                                        {passwordStrength.symbol ? '✓ ' : '✗ '}At least one special character
                                    </li>
                                </ul>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Reset Password
                        </Button>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ForgotPasswordModal;