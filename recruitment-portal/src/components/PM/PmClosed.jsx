import { useState, useEffect } from "react";
import { fetchClosedRequests } from "../../api/pmAPI";
import JobRequestTable from "../shared/jobRequest/JobRequestTable";

export function PmClosed({role}) {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadJobRequests = async () => {
    await fetchClosedRequests()
      .then((s) => setRequests(s.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadJobRequests();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="mx-5">Closed Job Requests</h2>
      <JobRequestTable role={role} jrList={requests} hasWorkbenchFill={false} hasForwardToHR={false} />
    </div>
  );
}