import axios from "axios";

//const baseURL='https://ushorten.onrender.com/api'
const baseURL='http://localhost:3001/api'

const authInstance= axios.create({
    baseURL : baseURL,
    timeout : 5000,
    headers : {
        'Content-Type' : 'application/json',
    }
});

const protectedInstance= axios.create({
    baseURL : baseURL,
    timeout : 5000,
});


protectedInstance.interceptors.request.use(config =>{
    if(sessionStorage.token){
        config.headers['Authorization'] = sessionStorage.token;
    }
    return config;
},error =>{
    return Promise.reject(error);
});

export default {
    authInstance,
    protectedInstance
}