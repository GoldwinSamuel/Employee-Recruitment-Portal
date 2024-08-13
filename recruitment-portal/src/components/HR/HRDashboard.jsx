import { Route, Routes } from "react-router-dom";
import NavbarC from "../shared/navbar/NavTemplate";
import { HrActive } from "./HrActive";
import { HrClosed } from "./HrClosed";
import { ProcessCandidate } from "./CandidateProcess";
import { NewCandidate } from "./CandidateNew";

const HumanResourcePage = ({ role, setIsLogged }) => {
    return (
        <>
            <NavbarC role={role} setIsLogged={setIsLogged} />
            <Routes>
                <Route index element={<ProcessCandidate />} />
                <Route path="active" element={<HrActive role={role} />} />
                <Route path="closed" element={<HrClosed role={role} />} />
                <Route path="candidates-process" element={<ProcessCandidate />} />
                <Route path="candidates-new" element={<NewCandidate />} />
            </Routes>
        </>
    );
};
export default HumanResourcePage;