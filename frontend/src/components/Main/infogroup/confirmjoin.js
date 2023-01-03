import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Navigate, Outlet } from 'react-router-dom'
import { toast } from "react-toastify"
import setAccessToken from '../../../utils/setAccessToken'
import { authContext } from '../../../contexts/authContext';
import Button from 'react-bootstrap/Button';

const ConfirmJoin = () => {
    let { groupID ,code } =useParams();
    const {authState: { isAuthenticated, user }} = useContext(authContext)
    const [success, setSuccess] = useState(false);

    console.log("confirm", isAuthenticated)
    const handleJoin = async data => {
        if (localStorage.token) {
			setAccessToken(localStorage.token)
		}
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/group/confirmedjoin/${groupID}/${code}`)
            if(res.data.success)
            {
                setSuccess(true)
                toast.success(res.data.message);
            }
            else  
                toast.warning(res.data.message)
        } catch (error) {
            toast.error(error.message);
        }
    };
    if (success) {
        <Navigate to='/' />
    }
    return (
        <>
            <div className ="container">
                <h1>Confirm To Join This Group</h1>
                <p className="center">You are joining as member role.</p>
                <div className='center'>
                    <Button variant='primary' onClick={handleJoin}>Join Group</Button>
                </div>
            </div>
            <Outlet/>
        </>
    );
}

export default ConfirmJoin;