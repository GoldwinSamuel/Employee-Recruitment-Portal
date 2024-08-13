import { Route, Routes } from "react-router-dom";
import NavbarC from "../shared/navbar/NavTemplate";
import CreatePage from "./Create";
import ConvertPage from "./Convert";
import EmployeePage from "./Employees";

const AdminPage = ({ role, setIsLogged }) => {

    return (
        <>
            <NavbarC role={role} setIsLogged={setIsLogged} />
            <Routes>
                <Route index element={<EmployeePage />} />
                <Route path="create" element={<CreatePage />} />
                <Route path="convert" element={<ConvertPage />} />
                <Route path="employee-details" element={<EmployeePage />} />
            </Routes>
        </>
    );
};


export default AdminPage;
