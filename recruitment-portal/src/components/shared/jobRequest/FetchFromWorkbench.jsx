import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { WorkbenchModal } from "../employee/WorkbenchModal";
import { fetchWorkBenchEmployees } from "../../../api/pmAPI";

export const FetchFromWorkbench = ({reqId, jobRequests, setRequests}) => {
  const [employees, setEmployees] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetchWorkBenchEmployees().then(s => setEmployees(s.data)).catch(e => setError(e)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Workbench
      </Button>
      <WorkbenchModal
        employeeList={employees}
        show={modalShow}
        onHide={() => setModalShow(false)}
        reqId={reqId}
        jobRequests={jobRequests}
        setRequests={setRequests}
      />
    </div>
  );
};
