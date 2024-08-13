import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';

export function HeadDepartment({ sfi, as, cs, id, onUpdate }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getButtonTextAndVariants = () => {
        if (sfi === null && as === null && cs === null) {
            return { text: "Pending", variant: "light", disabled: true };
        } else if (sfi === 'y' && as === null && cs === null) {
            return { text: "Pending", variant: "warning", disabled: true };
        } else if (sfi === 'y' && as === 'y' && cs === null) {
            return { text: "Confirm Candidate", variant: "success", disabled: false };
        } else if (sfi === 'n' || as === 'n' || cs === 'n') {
            return { text: "Removed from Interview", variant: "danger", disabled: true };
        } else if (sfi === 'y' && as === 'y' && cs === 'y') {
            return { text: "Selected", variant: "success", disabled: true };
        } else {
            return { text: "Unknown Status", variant: "secondary", disabled: true };
        }
    };

    const { text, variant, disabled } = getButtonTextAndVariants();

    const handleClick = async () => {
        if (text === "Confirm Candidate") {
            setLoading(true);
            try {
                await axios.put(`http://localhost:9090/api/hr/toSelected/${id}`);
                if (onUpdate) onUpdate();
            } catch (err) {
                setError("Failed to send to HR interview.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleReject = async () => {
        if (text === "Confirm Candidate") {
            setLoading(true);
            try {
                await axios.put(`http://localhost:9090/api/hr/toSelectedR/${id}`);
                if (onUpdate) onUpdate(); 
            } catch (err) {
                setError("Failed to send to HR interview.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div>
                <Button variant={variant} onClick={handleClick} disabled={disabled}>
                    {text}
                </Button>
                {!disabled && (
                    <Button variant="danger" onClick={handleReject} style={{ marginLeft: '10px' }}>
                        Reject
                    </Button>
                )}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </>
    );
}
