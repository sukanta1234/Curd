import axiosInstance from "../Axios/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";

export const homeApi=async()=>{
    try {
        let response=await axiosInstance(endpoints.auth.dashboard)
        return response.data.data
        
    } catch (error) {
        console.log(error);
        
    }
}