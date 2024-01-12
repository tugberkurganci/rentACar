import axios from "axios";

const axiosInstance = axios.create({
	baseURL: `/api`,
});

axiosInstance.interceptors.request.use(config => {
	
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

export default axiosInstance;