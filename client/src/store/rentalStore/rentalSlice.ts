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
            state.pickUpLocation=action.payload.pickUpLocation;
            state.dropOffLocation=action.payload.dropOffLocation;
        },

        deleteRental:(state)=>{

            state.startDate="";
            state.endDate="";
          

          
        },

       

    }
})







export const{ loadRental,deleteRental}=rentalSlice.actions;