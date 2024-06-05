import axiosInstance from "../Axios/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";

export const deleteApi=async(id)=>{
    try {
        const url=`${endpoints.cms.delete}/${id}`
        let response=await axiosInstance.delete(url)
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
}