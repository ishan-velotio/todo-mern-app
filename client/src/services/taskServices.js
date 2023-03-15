import axios from "axios";
const apiUrl = "http://localhost:8083/api/tasks";

export function getTasks(token) {
    return axios.get(apiUrl, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    });
}

export function addTask(task, token) {
    return axios.post(apiUrl, task, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    });
}

export function updateTask(id, task, token) {
    return axios.put(apiUrl + "/" + id, task, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    });
}

export function deleteTask(id, token) {
    return axios.delete(apiUrl + "/" + id, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    });
}
