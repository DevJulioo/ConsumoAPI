import axios from "axios";

const api = axios.create({
    baseURL: 'https://dragonball-api.com/api'
});

export default api;