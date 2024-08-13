import axios from "axios";

const hr_url = "http://localhost:9090/api/hr";

export const fetchAllJobRequests = () => {
    return axios.get(`${hr_url}/activeJobRequestsHR`);
};

export const fetchCandidates = () => {
    return axios.get(`${hr_url}/final`);
};

export const sendCandidateToAdmin = (id) => {
    console.log("Sending candidate to admin with id:", id);
    return axios.put(`${hr_url}/readyforhire/${id}`)
        .catch(error => {
            console.error('Error sending candidate to admin:', error);
            throw error;
        });
};

export const completeJobRequest = (id) => {
    console.log("Completing job request with id:", id);
    return axios.put(`${hr_url}/completeJobRequest/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error completing job request:', error);
            throw error;
        });
};
