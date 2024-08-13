// import { useState } from 'react';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { forwardToHr } from "../../../api/pmAPI";
import { completeJobRequest } from "../../../api/hrAPI";

// operationId = 1 => PM transfers the Job Request to HR
// operationId = 2 => PM fills the Job Request from workbench

export function AreYouSureAlert({ message, show, setShow, reqId, operationId, jobRequests, setJobRequests }) {
  //   const [show, setShow] = useState(show);
  // const [updatedJobRequest, setUpdatedJobRequest] = useState({});

  const updateJobRequestList = (jr) => {
    console.log(jr);
    let updatedJobRequestList = jobRequests.filter((request) => request.requestId != reqId);
    // updatedJobRequestList.push(jr);
    if (jr.jrLevel == 1) setJobRequests(updatedJobRequestList);
  }

  const successFunc = () => {
    const apiParams = { reqId };
    console.log('API call parameters:', apiParams);
    switch (operationId) {
      case 1:
        forwardToHr(reqId)
          .then(s => updateJobRequestList(s))
          .catch(error => console.error('Error forwarding to HR:', error));
        break;
      case 2:
        completeJobRequest(reqId)
          .then(s => updateJobRequestList(s))
          .catch(error => console.error('Error completing job request:', error));
        break;

    }
    setShow(false);
  }

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Alert!</Alert.Heading>
        <p>{message}</p>
        <hr />
        <div className="d-flex justify-content-around">
          <Button onClick={() => successFunc()} variant="outline-success">Yes</Button>
          <Button onClick={() => setShow(false)} variant="outline-danger">
            Close me
          </Button>
        </div>
      </Alert>

      {/* {!show && <Button onClick={() => operationFunc()}>Show Alert</Button>} */}
    </>
  );
}

export default AreYouSureAlert;
