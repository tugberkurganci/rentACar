import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authStore/authSlice";
import { storeAuthState, storeRentalState } from "./storage";
import { rentalSlice } from "./rentalStore/rentalSlice";

export const store = configureStore({

    reducer :{
        auth:authSlice.reducer,
        rental:rentalSlice.reducer
        
    }
});

store.subscribe(()=>{
    storeAuthState(store.getState().auth)
    storeRentalState(store.getState().rental)
})
