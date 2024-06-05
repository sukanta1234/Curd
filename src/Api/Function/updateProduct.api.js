import axiosInstance from "../Axios/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";

export const udateProduct=async({id,payload})=>{
    try {
        const url=`${endpoints.cms.update}/${id}`
        let response=await axiosInstance.post(url,payload)
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
}