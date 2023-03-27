import axios from "axios";

const client = axios.create({
    baseURL:'http://10.10.3.1:2222'
})

export default client