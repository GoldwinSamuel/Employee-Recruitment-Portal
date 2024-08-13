import { useEffect, useState } from "react";
import { fetchAllJobRequests } from "../../api/hrAPI";
import JobRequestTable from "../shared/jobRequest/JobRequestTable";

export function HrActive({ role }) {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadJobRequests = async () => {
        await fetchAllJobRequests()
            .then((s) => setRequests(s.data))
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadJobRequests();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (<>
        <h2 className="mx-5">Active Job Requests</h2>
        <JobRequestTable
            role={role}
            jrList={requests}
            hasFinish={false}
            hasCandidatesFill={true}
            hasForwardToHR={false}
            hasWorkbenchFill={false}
        />
    </>);
}