import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Api/Axios/axiosInstance";
import { toast } from "react-toastify";
export const STATUS=Object.freeze({
    LOADING:"loading",
    IDLE:"idle"

})
export const loginApi=createAsyncThunk("/login",async(data)=>{
    let response=await axiosInstance.post("/login",data)
    return response.data
})
const authSlice=createSlice({
    name:"login",
    initialState:{
        status:STATUS.IDLE,
        isLogin:false,
        isRedirect:null
    },
    reducers:{
        removeToken:(state)=>{
            localStorage.removeItem("token")
            localStorage.removeItem("image")
            localStorage.removeItem("user_id")
            
            state.isLogin=false


        },
        checkToken:(state,{payload})=>{
            const token=localStorage.getItem("token")

            if (token) {
                state.isLogin=true
                
            }
        },
        resetRe:(state,{payload})=>{
            state.isRedirect=payload
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(loginApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE
            if (payload.status===true) {
                toast.success(payload.message)
                state.isLogin=true
                state.isRedirect="/Home"
                localStorage.setItem("token",payload.token)
                localStorage.setItem("image",payload.user.image)
                localStorage.setItem("user_id",payload.user._id)
                

                
            }

        })
        .addCase(loginApi.rejected,(state,{payload})=>{
            state.status=STATUS.IDLE
            toast.error("Error in Login")
        })
    }
})
export const {removeToken,checkToken,resetRe}=authSlice.actions
export default authSlice.reducer