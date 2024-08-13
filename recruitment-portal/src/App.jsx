import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EmployeeLogin } from './components/Login/RecruitmantLogin';
import { useLocalStorage } from './hooks/useLocalStorage';
import AdminPage from './components/Admin/AdminDashboard';
import ProjectManagerPage from './components/PM/PMDashboard';
import NotFoundPage from './components/shared/pageNotFound/NotFoundPage';
import ProtectedRoute from './components/shared/security/ProtectedRoutes';
import HumanResourcePage from './components/HR/HRDashboard';
import TeamLeadPage from './components/TL/TLDashboard';
import InterviewerPage from './components/INTERVIEWER/InterviewerDashboard';

function App() {
  const [isLogged, setIsLogged] = useLocalStorage("loginDetail", { id: '', role: '', authenticated: false });

  const Logged=isLogged || {};

  const role = isLogged.role || '';

  const AdminPageWithProps = (props) => <AdminPage role={role} setIsLogged={setIsLogged} {...props} />;
  const ProjectManagerPageWithProps = (props) => <ProjectManagerPage role={role} setIsLogged={setIsLogged} {...props} />;
  const HumanResourcePageWithProps = (props) => <HumanResourcePage role={role} setIsLogged={setIsLogged} {...props} />;
  const TeamLeadPageWithProps = (props) => <TeamLeadPage role={role} setIsLogged={setIsLogged} Logged={Logged} {...props} />;
  const InterviewerPageWithProps = (props) => <InterviewerPage role={role} setIsLogged={setIsLogged} {...props} />;

  return (
    <Routes>
      <Route index element={<EmployeeLogin />} />
      <Route path="/home" element={<EmployeeLogin userLoginSetter={setIsLogged} />} />
      <Route path="/admin/*" element={<ProtectedRoute element={AdminPageWithProps} Logged={Logged} allowedRoles={['admin']} />} />
      <Route path="/PM/*" element={<ProtectedRoute element={ProjectManagerPageWithProps} Logged={Logged} allowedRoles={['PM']} />} />
      <Route path="/HR/*" element={<ProtectedRoute element={HumanResourcePageWithProps} Logged={Logged} allowedRoles={['HR']} />} />
      <Route path="/TL/*" element={<ProtectedRoute element={TeamLeadPageWithProps} Logged={Logged} allowedRoles={['TL']} />} />
      <Route path="/INTERVIEWER/*" element={<ProtectedRoute element={InterviewerPageWithProps} Logged={Logged} allowedRoles={['INTERVIEWER']} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

