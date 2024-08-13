import axios from "axios";

const pm_url = "http://localhost:9090/api/pm";

export const forwardToHr = (reqId) => {
  return axios.put(`${pm_url}/forwardToHR/${reqId}`);
};

export const makeEmployeeActive = (empId) => {
  return axios.put(`http://localhost:9090/api/employees/activate/${empId}`);
};

export const makeEmployeeInactive = (empId) => {
  return axios.put(`http://localhost:9090/api/tl/updateActiveEmployeesStatus/${empId}`);
}

export const fillJobRequestFromWorkbench = (reqId, count) => {
  return axios.put(
    `http://localhost:9090/api/pm/fillFromWorkBench/${reqId}/${count}`
  );
};

export const fetchActiveRequests = () => {
  return axios.get(`${pm_url}/activeJobRequests`);
};

export const fetchPendingRequests = () => {
  return axios.get(`${pm_url}/pendingJobRequests`);
};

export const fetchClosedRequests = () => {
  return axios.get(`${pm_url}/closedJobRequests`);
};

export const fetchWorkBenchEmployees = () => {
  return axios.get("http://localhost:9090/api/employees/inactive");
};
