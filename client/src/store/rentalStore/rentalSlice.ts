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
        loadCar:(state,action)=>{

            state.carId=action.payload;
           
        },

        deleteRental:(state)=>{

             state.startDate=""
             state.endDate=""
             state.pickUpLocation=""
             state.dropOffLocation=""
             state.carId=0

          
        },

       

    }
})







export const{ loadRental,deleteRental,loadCar}=rentalSlice.actions;