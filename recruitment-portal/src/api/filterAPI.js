import axios from "axios"

export function filterInactiveEmployees(skillId, roleId) {
    if (skillId && roleId) {
        return axios.get(`http://localhost:9090/api/employees/inactive/filter/${roleId}/${skillId}`);
    } else if (skillId) {
        return axios.get(`http://localhost:9090/api/employees/inactive/filter/skill/${skillId}`);
    } else if (roleId) {
        return axios.get(`http://localhost:9090/api/employees/inactive/filter/role/${roleId}`);
    } else {
        return axios.get(`http://localhost:9090/api/employees/inactive`);
    }
}

export function filterAllEmployees(name, status) {
    if (name && status) {
        return axios.get(`http://localhost:9090/api/employees/all/filter/nameAndStatus/${name}/${status}`);
    } else if (name) {
        return axios.get(`http://localhost:9090/api/employees/all/filter/name/${name}`);
    } else if (status) {
        return axios.get(`http://localhost:9090/api/employees/all/filter/status/${status}`);
    } else {
        return axios.get(`http://localhost:9090/api/employees/`);
    }
}

export function filterAllCandidates(name) {
    if (name) {
        return axios.get(`http://localhost:9090/api/candidates/all/filter/name/${name}`);
    }
    else {
        return axios.get(`http://localhost:9090/api/candidates/`);
    }
}

export function filterFinalCandidates(skillId, roleId){
    if (skillId && roleId) {
        return axios.get(`http://localhost:9090/api/candidates/final/filter/${roleId}/${skillId}`);
    } else if (skillId) {
        return axios.get(`http://localhost:9090/api/candidates/final/filter/skill/${skillId}`);
    } else if (roleId) {
        return axios.get(`http://localhost:9090/api/candidates/final/filter/role/${roleId}`);
    } else {
        return axios.get(`http://localhost:9090/api/hr/final`);
    }
}