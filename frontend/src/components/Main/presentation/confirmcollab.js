import {authContext} from '../../../contexts/authContext'
import {Navigate, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import setAccessToken from '../../../utils/setAccessToken'
import { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import jwt_decode from "jwt-decode";

function ConfirmJoinGroup() {
    const { authState: {authLoading, isAuthenticated, user } } = useContext(authContext)
    const {idpp, token} = useParams();
    const decoded = jwt_decode(token);
    const email = decoded.email;
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/');
    }
    const handleAccept = async() => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/presentation/${idpp}/joincollab/${token}`)
            console.log(res.data);
            if(res.data.success) {
                toast.success(res.data.message);
                navigate('/')
            }
            else
            {
                toast.warning(res.data.message);
            }
        } catch (error) {
            toast.error("Can not join group right now. Please check the link or try again later.")
            console.log(error);
        }
    }
    
    if(authLoading)
    {
        return (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info' />
			</div>
		)
    }
    else if (user.email != email)
    {
        localStorage.removeItem('token');
        <Navigate to="/login"/>
        window.location.reload(true);
    }
    else{
    return (
        <div className='container'>
            <h1>Comfirm Collaboration</h1>
            <p className='center'>You are accepting to colaborate. Please confirm again.</p>
            <div className="center">
                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="primary" onClick={handleAccept}>Accept</Button>
            </div>
        </div>
    );
    }
    
}

export default ConfirmJoinGroup;