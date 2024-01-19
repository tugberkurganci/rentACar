import { configureStore, createSlice } from "@reduxjs/toolkit";
import { loadAuthState, storeAuthState } from "./storage";
import { setToken } from "../utils/interceptors/axiosInterceptors";


const authSlice =createSlice({
    name:'auth',
    initialState: loadAuthState(),
    reducers:{
        
        loginSuccess:(state,action)=>{

            state.id=action.payload.id;
            state.firstName=action.payload.firstName;
            state.email=action.payload.email;
           setToken(action.payload.token)
        },

        logoutSuccess:(state)=>{

            state.id=0;
            delete state.firstName
            delete state.email
            setToken()
        },

       

    }
})

export const store = configureStore({

    reducer :{
        auth:authSlice.reducer
    }
});

store.subscribe(()=>{
    storeAuthState(store.getState().auth)
})



export const{ loginSuccess,logoutSuccess}=authSlice.actions;