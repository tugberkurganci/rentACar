import {  createSlice } from "@reduxjs/toolkit";
import { loadAuthState } from "../storage";
import { setToken } from "../../utils/interceptors/axiosInterceptors";



export const authSlice =createSlice({
    name:'auth',
    initialState: loadAuthState(), 
    reducers:{
        
        loginSuccess:(state,action)=>{

            state.id=action.payload.id;
            // state.firstName=action.payload.firstName;
            state.email=action.payload.email;
            state.role = action.payload.role;
           setToken(action.payload.token)
        },

        logoutSuccess:(state)=>{

            state.id=0;
            // delete state.firstName
            delete state.email
            delete state.role
            setToken()
        },

       

    }
})


export const{ loginSuccess,logoutSuccess}=authSlice.actions;