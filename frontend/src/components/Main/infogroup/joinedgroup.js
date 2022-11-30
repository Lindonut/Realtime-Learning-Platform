import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom'
import { toast } from "react-toastify"
import setAccessToken from '../../../utils/setAccessToken'

const JoinedGroup = () => {
    let { id,code } =useParams();
    const [success, setSuccess] = useState(false);
    const joined = async() => {
        if (localStorage.token) {
			setAccessToken(localStorage.token)
		}
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/group/invitation/${id}/${code}`)
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
    }
    joined();
    if (!success) {
        return <Navigate to='/login' />
    }
    return (
        <Navigate to='/' />
    );
}

export default JoinedGroup;