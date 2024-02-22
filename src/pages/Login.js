import React, { useState } from 'react';
import AuthUser from '../components/auth/AuthUser';
import { baseURL } from '../constants/alpha-env.constant'
export default function Login() {
    const {http,setToken} = AuthUser();
    const [isLogin, setLogin] = useState(true);
    const [getRegisterData, setRegisterData] = useState({});

    const handleChange = (event) => {
        setRegisterData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const showRegisterForm = () => {
        setLogin((prevIsLogin) => !prevIsLogin);
    };

    const login = async () => {
        try {
            const { data } = await http.post(`${baseURL}/user-ms/login`, getRegisterData);
            localStorage.setItem('x-access-token', data.token);
            setToken(data.email,data.token)
            localStorage.setItem('login', true);
         } catch (error) {
            localStorage.setItem('login', false);
        }
    };

    const registerUser = async () => {
        try {
            await http.post(`${baseURL}/user-ms/register`, getRegisterData);
            setLogin(true);
        } catch (error) {}
    };

    

    return (
        <main className="form-signin" style={{ padding: '10% 0', margin: '0 auto', maxWidth: '400px' }}>
            <div className="form-floating mb-3 text-center fw-bold fs-1">Bid.com</div>
            {!isLogin && (
                <>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingFirstname" placeholder="First Name" name="firstName" onChange={handleChange} />
                        <label htmlFor="floatingFirstname">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingLastName" placeholder="Last Name" name="lastName" onChange={handleChange} />
                        <label htmlFor="floatingLastName">Last Name</label>
                    </div>
                </>
            )}
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={handleChange} />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating  mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={handleChange} />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-dark" type="submit" onClick={() => (isLogin ? login() : registerUser())}>
                {!isLogin ? 'Sign in' : 'Sign Up'}
            </button>
            <p className="mt-3">
                Already User?{' '}
                <span className="primary-color" style={{ cursor: 'pointer' }} onClick={showRegisterForm}>
                    {' '}
                    Create a new account
                </span>
            </p>
        </main>
    );
}
