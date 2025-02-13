import axiosInstance from "../Axios/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";

export const registerApi=async(data)=>{
    try {
        let response=await axiosInstance.post(endpoints.auth.register,data)
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
}