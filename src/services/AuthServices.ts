import client from "../res/api/client";
import Login from "../res/type/Login.type";

const AuthService = {
    Login: async (payload: Login) => {
        return client.post('/auth/login',payload)
    }
}

export default AuthService