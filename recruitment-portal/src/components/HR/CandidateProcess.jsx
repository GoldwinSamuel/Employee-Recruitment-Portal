import axios from "axios";
import { useEffect, useState } from "react";
import { Role } from "../shared/roles/Role";
import { Skill } from "../shared/skills/Skill";
import { Techinical } from "./HRsubComponents/TechinicalPart";
import { HeadDepartment } from "./HRsubComponents/HeadDepartment";
import { Button } from "react-bootstrap";

export function ProcessCandidate() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(
                "http://localhost:9090/api/hr/listOfAllCandidates"
            );
            setCandidates(response.data);
        } catch (err) {
            setError("Failed to fetch candidates.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (candidateId) => {
        setLoading(true);
        setError(null);
        try {
            await axios.put(`http://localhost:9090/api/candidates/reset/${candidateId}`);
            fetchCandidates();
        } catch (err) {
            setError("Failed to reset candidate.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="text-left mb-4">Candidate List</h2>
            <br />
            {candidates.length === 0 ? (
                <p className="text-center">No candidates</p>
            ) : (
                <div>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Candidate ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Skill 1</th>
                                <th>Skill 2</th>
                                <th>Skill 3</th>
                                <th>Technical Interview</th>
                                <th>HR Interview</th>
                                <th>Reset</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <tr key={candidate.candidateId}>
                                    <td>{candidate.candidateId}</td>
                                    <td>{candidate.name}</td>
                                    <td>{<Role id={candidate.roleId} />}</td>
                                    <td>{<Skill id={candidate.skill1Id} />}</td>
                                    <td>{<Skill id={candidate.skill2Id} />}</td>
                                    <td>{<Skill id={candidate.skill3Id} />}</td>
                                    <td>
                                        <Techinical 
                                            id={candidate.candidateId} 
                                            sfi={candidate.selectedForInterview} 
                                            as={candidate.assessmentStatus} 
                                            cs={candidate.confirmationStatus} 
                                            onUpdate={fetchCandidates} // Pass callback here
                                        />
                                    </td>
                                    <td>
                                        <HeadDepartment 
                                            id={candidate.candidateId} 
                                            sfi={candidate.selectedForInterview} 
                                            as={candidate.assessmentStatus} 
                                            cs={candidate.confirmationStatus} 
                                            onUpdate={fetchCandidates} 
                                        />
                                    </td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleReset(candidate.candidateId)}>
                                            Reset
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}