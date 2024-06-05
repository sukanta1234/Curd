import axiosInstance from "../Axios/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";

export const createApi=async(data)=>{
    try {
        let response=await axiosInstance.post(endpoints.cms.createProduct,data)
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
}