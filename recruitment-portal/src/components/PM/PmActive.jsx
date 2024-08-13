import { useState, useEffect } from "react";
import JobRequestTable from "../shared/jobRequest/JobRequestTable";
import { fetchActiveRequests } from "../../api/pmAPI";

export function PmActive({role}) {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadJobRequests = async () => {
    await fetchActiveRequests()
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
      <h2 className="mx-5">Active Job Requests</h2>
      <JobRequestTable role={role} jrList={requests} hasWorkbenchFill={true} hasForwardToHR={true} />
    </div>
  );
}