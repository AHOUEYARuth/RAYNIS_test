import api from "@/api/axios";
import type { LoginPayload, RegisterPayload } from "./authType";

export const authRequest = {
    login(data: LoginPayload){
        return api.post('/auth/login', data)
    },

    register(data: RegisterPayload){
        return api.post('/auth/register', data)
    },

}