import axios from "axios";

const client = axios.create({
    baseURL:'http://localhost:2222'
})

export default client