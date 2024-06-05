import axiosInstance from "../Axios/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";

export const productApi=async()=>{
    try {
        let response=await axiosInstance.get(endpoints.cms.product)
        return response.data.data
        
    } catch (error) {
        console.log(error);
        
    }
}