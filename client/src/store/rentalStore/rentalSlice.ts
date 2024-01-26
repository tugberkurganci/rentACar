import {  createSlice } from "@reduxjs/toolkit";
import { loadAuthState, loadRentalState } from "../storage";
import { setToken } from "../../utils/interceptors/axiosInterceptors";



export const rentalSlice =createSlice({
    name:'rental',
    initialState:loadRentalState(), 
    
    reducers:{
        
        loadRental:(state,action)=>{

            state.startDate=action.payload.startDate;
            state.endDate=action.payload.endDate;
        },

        deleteRental:(state)=>{

            state.startDate="";
            state.endDate="";
          

          
        },

       

    }
})







export const{ loadRental,deleteRental}=rentalSlice.actions;