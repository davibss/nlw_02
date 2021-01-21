import api from "./api";

interface Response {
    token: string,
    userId: number
}

export default function login(email: string, password: string): Promise<Response>{
    return api.post('/login', {email, password}).then(response => response.data);
}