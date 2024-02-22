import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../constants/alpha-env.constant'
export default function AuthUser(){
    const navigate = useNavigate();

    // Define getToken function
    const getToken = () =>{
        const tokenString = localStorage.getItem('x-access-token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }

    

    const [token,setToken ] = useState(getToken()); // Initialize token with getToken()

    const saveToken = (user,token) =>{
        localStorage.setItem('x-access-token', JSON.stringify(token));

        setToken(token);
        navigate('/'); 
    }

    const logOut = () =>{
        localStorage.clear();
        navigate('/login'); 
    }

    const http = axios.create({
        baseURL: baseURL,
        headers:{
            "Content-Type" : "application/json"
        }
    });

    return {
        http,
        setToken:saveToken,
        token,
        getToken,
        logOut
    }
}
