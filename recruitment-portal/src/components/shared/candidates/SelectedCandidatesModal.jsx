import { Button, Modal } from "react-bootstrap";
import { CandidateTable } from "./CandidateTable";

export function SelectedCandidatesModal({
    candidateList,
    show,
    onHide,
    role,
    reqId,
    jobRequests,
    setRequests
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
                    Selected Candidates
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CandidateTable
                    candidateList={candidateList}
                    role={role}
                    reqId={reqId}
                    onCandidateHide={onHide}
                    jobRequests={jobRequests}
                    setRequests={setRequests}
                    show={show}
                    hasSkillAndRoleFilter={true}
                    hasCheckbox={true}
                    hasNameFilter={false}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default SelectedCandidatesModal;