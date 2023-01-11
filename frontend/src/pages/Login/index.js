//import '../Register/Register.css';
import { useForm } from "react-hook-form"
import {Link, Navigate} from "react-router-dom"
import {useState, useContext} from 'react'
import { toast } from "react-toastify"
import {authContext} from '../../contexts/authContext'
import JoinCode from '../../components/JoinCode/index'
import axios from 'axios'
import GoogleLoginButton from '../../components/Buttons/GoogleLogin';
import Spinner from 'react-bootstrap/Spinner'

function Login() {
    const {loginUser} = useContext(authContext)
    const { authState: {authLoading, isAuthenticated } } = useContext(authContext)
    const { register: login, handleSubmit, formState: {errors} } 
    = useForm({
        mode: "onTouched", 
        defaultValues: {email: '',password: ''},
        criteriaMode: "all",
    });

    const onSubmit = async data => {
        try {
            const loginData = await loginUser(data.email, data.password)
            if(loginData.success)
            {
                toast.success(loginData.message);
            }
            else  
                toast.warning(loginData.message);
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    if(authLoading)
    {
        return (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info' />
			</div>
		)
    }
    else if (isAuthenticated) return <Navigate to='/' />

    return (
        <div>
            <div className="container">
                <div className="containerForm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>LOGIN</h1>
                        <label>Email</label>
                        <input type="email" {...login("email",{required: "This is required"})} placeholder="Email"/>
                        <p className="pWarning">{errors.email?.message}</p>
                        <label>Password</label>
                        <input type="password" {...login("password",{required: "This is required"})} placeholder="Password"/>
                        <p className="pWarning">{errors.password?.message}</p>
                        <Link to="/fogotPassword" className="linkDecoration forgotpass"> Forgot your password? Click here.</Link>
                        <div className="center">
                            <p className="pStyle">Not have an account?&nbsp;</p>
                            <Link to="/register" className="linkDecoration"> Register Here!</Link>
                        </div>
                        <input type="submit" value="Login"/>
                    </form>
                    <p className="center">Or continue with</p>
                    <div className="center"><GoogleLoginButton/></div>
                </div>
            </div>
        </div>
    );
}

export default Login;
