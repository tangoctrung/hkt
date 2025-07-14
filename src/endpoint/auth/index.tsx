import { DataLoginRequest, DataRegisterRequest } from "../../types/DataRequest";
import AxiosInstance from "../api";

export const loginUser = (dataRequest: DataLoginRequest) => {
    return AxiosInstance.post("/auth/login", dataRequest)
}

export const registerUser = (dataRequest: DataRegisterRequest) => {
    return AxiosInstance.post("/auth/register", dataRequest)
}

export const getInfoUser = () => {
    return AxiosInstance.get("/user/get-me")
}