import { Route, Routes } from "react-router-dom";
import NavbarC from "../shared/navbar/NavTemplate";
import PendingInterviewsPage from "./PendingList";
import CompletedInterviewsPage from "./CompletedList";

const InterviewerPage = ({ role, setIsLogged }) => {
    return (
        <>
            <NavbarC role={role} setIsLogged={setIsLogged} />
            <Routes>
                <Route index element={<PendingInterviewsPage />} />
                <Route path="/pending-interviews" element={<PendingInterviewsPage />} />
                <Route path="/completed-interviews" element={<CompletedInterviewsPage />} />
            </Routes>
        </>
    );
};
export default InterviewerPage;