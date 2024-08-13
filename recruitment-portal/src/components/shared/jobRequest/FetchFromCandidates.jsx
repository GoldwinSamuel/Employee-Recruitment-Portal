import { Button } from "react-bootstrap";
import { fetchCandidates } from "../../../api/hrAPI";
import { useEffect, useState } from "react";
import { SelectedCandidatesModal } from "../candidates/SelectedCandidatesModal";

export const FetchFromCandidates = ({ role, reqId, jobRequests, setRequests }) => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        fetchCandidates().then(s =>
        {
            console.log(s.data);
            setCandidates(s.data);
    })
            .catch(e => setError(e))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Candidates
            </Button>
            <SelectedCandidatesModal
                candidateList={candidates}
                show={modalShow}
                onHide={() => setModalShow(false)}
                role={role}
                reqId={reqId}
                jobRequests={jobRequests}
                setRequests={setRequests}
            />
        </>
    );
}