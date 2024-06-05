import axiosInstance from "../Axios/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";

export const singleApi=async(id)=>{
        try {
            let url=`${endpoints.cms.single}/${id}`
            let response=await axiosInstance.get(url)
            return response.data.data
            
        } catch (error) {
            console.log(error);
            
        }
}