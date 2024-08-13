import { Route, Routes } from "react-router-dom";
import NavbarC from "../shared/navbar/NavTemplate";
import { JobRequestForm } from "./JobRequestForm";
import ActiveRequests from "./ActiveRequests";
import ClosedRequests from "./ClosedRequests";
import ChangeEmployeeStatus from "./ChangeEmployeeStatus";

const TeamLeadPage = ({ role, setIsLogged, Logged }) => {
    return (
        <>
            <NavbarC role={role} setIsLogged={setIsLogged} />
            <Routes>
                <Route index element={<ChangeEmployeeStatus />} />
                <Route path="create" element={<JobRequestForm tlId={Logged.id} />} />
                <Route path="active" element={<ActiveRequests tlId={Logged.id} />} />
                <Route path="closed" element={<ClosedRequests tlId={Logged.id} />} />
                <Route path="status" element={<ChangeEmployeeStatus />} />
            </Routes>
        </>
    );
};
export default TeamLeadPage;