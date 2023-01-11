import './Register.css';
import { useForm } from "react-hook-form";
import {Link, Navigate, useNavigate} from "react-router-dom"
import {useContext, useState} from 'react'
import {authContext} from '../../contexts/authContext'
import { toast } from "react-toastify"
import JoinCode from '../../components/JoinCode/index'
import GoogleLoginButton from '../../components/Buttons/GoogleLogin';


function Register() {
    const {registerUser} = useContext(authContext)
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors} } 
    = useForm({
        mode: "onTouched", 
        defaultValues: {name: '',email: '',password: ''},
        criteriaMode: "all",
    });
    let user;
    const onSubmit = async data => {
        try {
            const registerData = await registerUser(data.name, data.email, data.password)
            if(registerData.success)
            {
                toast.success(registerData.message);
                setSuccess(true);
                user = registerData.newUser;
                let userID = user._id;
                console.log("user", user);
                navigate(`/verify/${userID}`);
            }
            else  
                toast.warning(registerData.message);
        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    };

  return (
    <div>
        <br />
        <br />
        <div className="container">
            <div className="containerForm">
                <form onSubmit={handleSubmit(onSubmit)}>
                <h1>REGISTER</h1>
                <label>Name</label>
                <input {...register("name", {required: "This is required"})} placeholder="Name" />
                <p className="pWarning">{errors.name?.message}</p>
                <label>Email</label>
                <input type="email" {...register("email",{required: "This is required"})} placeholder="Email"/>
                <p className="pWarning">{errors.email?.message}</p>
                <label>Password</label>
                <input type="password" {...register("password",{required: "This is required.", minLength: {
                    value: 6, message: "Require atleast 6 characters."}})} placeholder="Password"/>
                <p className="pWarning">{errors.password?.message}</p>
                <div className="center">
                    <p className="pStyle">Already have an account?&nbsp;</p>
                    <Link to="/login" className="linkDecoration"> Login Here!</Link>
                </div>
                <input type="submit" value="Register"/>
                </form>
                <p className="center">May also register with</p>
                <div className="center"><GoogleLoginButton/></div>
            </div>
        </div>
    </div>
  );
}

export default Register;
