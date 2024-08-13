import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { EmployeeTable } from "./EmployeeTable";

export function WorkbenchModal({
  employeeList,
  show,
  onHide,
  reqId,
  jobRequests,
  setRequests,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      scrollable={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Workbench Employees
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* For PM  */}
        <EmployeeTable
          employeeList={employeeList}
          reqId={reqId}
          jobRequests={jobRequests}
          setRequests={setRequests}
          show={show}
          onWorkbenchHide={onHide}
          hasFillFromWorkbenchSubmit={true}
          hasCheckbox={true}
          hasStatusAndNameFilter={false}
        />
        {/* For TL*/}
        {/* <EmployeeTable
            employeeList={employeeList}
            reqId={reqId}
            jobRequests={jobRequests}
            setRequests={setRequests}
            hasFillFromWorkbenchSubmit={false}
            hasMakeEmployeeActive={true}
            hasCheckbox={true}
            hasStatusAndNameFilter={false}
          /> */}
        {/* For Admin */}
        {/* <EmployeeTable
          employeeList={employeeList}
          hasStatusAndNameFilter={true}
          hasFillFromWorkbenchSubmit={false}
          hasMakeEmployeeActive={false}
          hasCheckbox={false}
        /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
