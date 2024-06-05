import axiosInstance from "../Axios/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";

export const forgotApi=async(data)=>{
    try {
        let response=await axiosInstance.post(endpoints.auth.forgetPassword,data)
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
}