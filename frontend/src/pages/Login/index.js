//import '../Register/Register.css';
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom"
import {useState, useContext} from 'react'
import {authContext} from '../../contexts/authContext'

function Login() {

    const {loginUser} = useContext(authContext)
    const { register: login, handleSubmit, formState: {errors} } 
    = useForm({
        mode: "onChange", 
        defaultValues: {email: '',password: ''},
        criteriaMode: "all",
    });

    const onSubmit = async data => {
        try {
            console.log(data)
            const loginData = await loginUser(data.email, data.password)
            console.log(loginData);
        } catch (error) {
            console.log(error)
        }
    };

    return (
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
                <div className="center">
                    <p className="pStyle">Not have an account?&nbsp;</p>
                    <Link to="/register"> Register Here!</Link>
                </div>
                <input type="submit" value="Login"/>
            </form>
            <p className="center">Or continue with</p>
            <div class="socmed-login">
                <a href="#google" class="socmed-btn google-btn">
                    <i class="fa fa-google"></i>
                    <span>Login with Google</span>
                </a>
            </div>
            </div>
        </div>
    );
}

export default Login;
