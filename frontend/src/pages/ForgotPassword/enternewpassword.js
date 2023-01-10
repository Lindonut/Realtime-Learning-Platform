import {authContext} from '../../contexts/authContext'
import {Navigate, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function NewPassword() {
    //const {registerState: { isRegistered, isVerified}} = useContext(authContext)
    //const {isAuthenticated, user} = useContext(authContext)


    // if (!isRegistered) return <Navigate to='/register' />
    //if (isVerified) return <Navigate to='/' />
    const navigate = useNavigate();
    const {token} = useParams();
    const formSchema = Yup.object().shape({
        newpassword: Yup.string()
          .required("This is required")
          .min(4, "Require atleast 6 characters.")
          .max(20, "Password cannot exceed more than 20 characters"),
        cfnewpassword: Yup.string()
          .required("This is required")
          .min(4, "Require atleast 6 characters.")
          .max(20, "Password cannot exceed more than 20 characters")
          .oneOf([Yup.ref("newpassword")], "Passwords do not match")
      });

    const { register: resetpassword, handleSubmit, formState: {errors} } 
    = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema), 
        defaultValues: {newpassword: '',cfnewpassword: ''},
        criteriaMode: "all",
    });
    let newpassword ;
    let cfnewpassword ;
    const onSubmit = async data => {
        newpassword = data.newpassword;
        cfnewpassword = data.cfnewpassword;
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/resetpassword/${token}`, {newpassword, cfnewpassword})
            if(res.data.success)
            {
                navigate('/login');
                toast.success(res.data.message);
            }
            else  
                toast.warning(res.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container">
        <div className="containerForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>RESET PASSWORD</h1>
                <label>New Password</label>
                <input type="password" {...resetpassword("newpassword")} placeholder="New Password"/>
                <p className="pWarning">{errors.newpassword?.message}</p>
                <label>Confirm New Password</label>
                <input type="password" {...resetpassword("cfnewpassword")} placeholder="Confirm New Password"/>
                <p className="pWarning">{errors.cfnewpassword?.message}</p>
                <br/>
                <input type="submit" value="Change"/>
            </form>
        </div>
    </div>
    );
}

export default NewPassword;