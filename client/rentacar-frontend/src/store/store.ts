import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authStore/authSlice";
import { storeAuthState } from "./storage";

export const store = configureStore({

    reducer :{
        auth:authSlice.reducer
    }
});

store.subscribe(()=>{
    storeAuthState(store.getState().auth)
})
