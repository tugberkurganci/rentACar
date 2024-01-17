import axios from "axios";
import { loadToken, storeToken } from "../../store/storage";

const axiosInstance = axios.create({
	baseURL: `/api`,
});

axiosInstance.interceptors.request.use(config => {

	if(authToken){

        config.headers["Authorization"]=`${authToken.prefix} ${authToken.token}`
    }
	
	return config;
});

axiosInstance.interceptors.response.use(
	value => {
		
		return value;
	},
	error => {
		
		return error;
	},
);

let authToken= loadToken();

export function setToken(token?:any){
authToken=token;
storeToken(token);
}




export default axiosInstance;