import './Register.css';
import { useForm } from "react-hook-form";
import {Link, Navigate} from "react-router-dom"
import {useContext, useState} from 'react'
import {authContext} from '../../contexts/authContext'
import { toast } from "react-toastify"

function Register() {
    const {registerUser} = useContext(authContext)
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, formState: {errors} } 
    = useForm({
        mode: "onChange", 
        defaultValues: {name: '',email: '',password: ''},
        criteriaMode: "all",
    });
    const onSubmit = async data => {
        try {
            const registerData = await registerUser(data.name, data.email, data.password)
            setSuccess(true);
            if(registerData.success)
                toast.success(registerData.message);
            else  
                toast.warning(registerData.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (success) return <Navigate to='/verify' />

  return (
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
        <div class="socmed-login">
                <a href="#g-plus" class="socmed-btn google-btn">
                    <i class="fa fa-google"></i>
                    <span>Register with Google</span>
                </a>
            </div>
        </div>
      </div>
  );
}

export default Register;
