import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { injectStore } from "./utils/interceptors/axiosInterceptors.ts";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

injectStore(store)

ReactDOM.createRoot(document.getElementById("root")!).render(

  
  <Provider store={store}>
    
    <BrowserRouter>
    <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
      />
      <App />
      
    </BrowserRouter>
  </Provider>
);
