import { Route, Routes } from "react-router-dom";
import NavbarC from "../shared/navbar/NavTemplate";
import { PmActive } from "./PmActive";
import { PmPending } from "./PmPending";
import { PmClosed } from "./PmClosed";

const ProjectManagerPage = ({ role, setIsLogged }) => {
    return (
        <>
            <NavbarC role={role} setIsLogged={setIsLogged} />
            <Routes>
                <Route index element={<PmActive />} />
                <Route path="active" element={<PmActive role={role} />} />
                <Route path="pending" element={<PmPending role={role} />} />
                <Route path="closed" element={<PmClosed role={role} />} />
            </Routes>
        </>
    );
};

export default ProjectManagerPage;
