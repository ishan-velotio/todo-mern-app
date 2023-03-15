import axios from "axios";
const apiUrl = "http://localhost:8083/api/login";

export async function loginUser(formValues) {
    try {
        const response = axios.post(apiUrl, formValues)
        return response
    } catch (error) {
        console.log(error)
    }
}