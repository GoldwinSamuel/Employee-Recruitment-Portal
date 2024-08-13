import { Button } from "react-bootstrap";
import { useState } from "react";
import AreYouSureAlert from "./AreYouSureAlert";
import { JrLevelMessage } from "./JrLevelMessage";
import { Role } from "../roles/Role";
import { Skill } from "../skills/Skill";
import { FetchFromWorkbench } from "./FetchFromWorkbench";
import { FetchFromCandidates } from "./FetchFromCandidates";

export const JobRequestTable = ({
  role,
  jrList,
  hasWorkbenchFill,
  hasForwardToHR,
  hasCandidatesFill,
  hasFinish
}) => {
  const [jobRequests, setJobRequests] = useState(jrList);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertReqId, setAlertReqId] = useState("");
  const [operationId, setOperationId] = useState(0);

  const showAreYouSureAlertBox = (message, reqId) => {
    setAlertReqId(reqId);
    setShowAlert(true);
    setAlertMessage(message);
  };

  return (
    <div className="container mt-2">
      <AreYouSureAlert
        message={alertMessage}
        show={showAlert}
        setShow={setShowAlert}
        jobRequests={jobRequests}
        setJobRequests={setJobRequests}
        reqId={alertReqId}
        operationId={operationId}
      />
      <br />
      {jobRequests.length === 0 ? (
        <p className="text-center">No pending requests</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th className="text-primary text-center">#</th>
              <th className="text-primary text-center">Req ID</th>
              <th className="text-primary text-center">Created on</th>
              <th className="text-primary text-center">Role</th>
              <th className="text-primary text-center">Description</th>
              <th className="text-primary text-center">Skill 1</th>
              <th className="text-primary text-center">Skill 2</th>
              <th className="text-primary text-center">Skill 3</th>
              <th className="text-primary text-center">Vacancies</th>
              <th className="text-primary text-center">Filled</th>
              {/* <th>Pending</th> */}
              <th className="text-primary text-center">Status</th>
              {hasWorkbenchFill && (
                <th className="text-primary text-center">fill</th>
              )}
              {hasCandidatesFill && (
                <th className="text-primary text-center">Assign</th>
              )}
              {hasForwardToHR && (
                <th className="text-primary text-center">Forward to</th>
              )}
              {hasFinish && (
                <th className="text-primary text-center">Pre Finalize</th>
              )}
            </tr>
          </thead>
          <tbody>
            {jobRequests.map((request, index) => (
              <tr key={request.requestId}>
                <td className="text-center">{index + 1}</td>
                <td>{request.requestId}</td>
                <td className="text-center">
                  {new Date(request.createdDate).toLocaleDateString()}
                </td>
                <td className="text-center">
                  <Role id={request.roleId} />
                </td>
                <td className="text-center">{request.description}</td>
                <td className="text-center">
                  <Skill id={request.skill1Id} />
                </td>
                <td className="text-center">
                  <Skill id={request.skill2Id} />
                </td>
                <td className="text-center">
                  <Skill id={request.skill3Id} />
                </td>
                <td className="text-center">{request.vacancies}</td>
                <td className="text-center">{request.filled}</td>
                <td className="text-center">
                  <JrLevelMessage rId={role} jrLvl={request.jrLevel} />
                </td>
                {hasWorkbenchFill && (
                  <td className="text-center">
                    <FetchFromWorkbench
                      reqId={request.requestId}
                      jobRequests={jobRequests}
                      setRequests={setJobRequests}
                    />
                  </td>
                )}
                {hasCandidatesFill && (
                  <td className="text-center">
                    <FetchFromCandidates
                      role={role}
                      reqId={request.requestId}
                      jobRequests={jobRequests}
                      setRequests={setJobRequests}
                    />
                  </td>
                )}
                {hasForwardToHR && (
                  <td className="text-center">
                    <Button
                      className="btn btn-primary"
                      onClick={() => {
                        setOperationId(1);
                        showAreYouSureAlertBox(
                          "Are you sure you want to forward the job request to the HR?",
                          request.requestId
                        );
                      }}
                    >
                      HR
                    </Button>
                  </td>
                )}
                {hasFinish && (
                  <td className="text-center">
                    <Button
                      className="btn btn-primary"
                      onClick={() => {
                        setOperationId(2);
                        showAreYouSureAlertBox(
                          "Are you sure you want to CLOSE the job request?",
                          request.requestId
                        );
                      }}
                    >
                      Finish
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobRequestTable;
