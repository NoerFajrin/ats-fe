import axios from "axios";

const client = axios.create({
    // baseURL:'http://localhost:2222'
    // baseURL:'http://10.10.3.1:2222'
    // baseURL:`http://192.168.18.33:2222`
    baseURL:`https://ats-api.srv.kirei.co.id`
    })

export default client