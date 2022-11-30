import {Navigate, Link, useParams} from 'react-router-dom'
import { useContext, useState} from 'react'
import { toast } from "react-toastify"
import {authContext} from '../../contexts/authContext'
import './index.css'

function VerifySuccess() {
    const [success, setSuccess] = useState(false);
    const {token} = useParams();
    const {verifyEmail} = useContext(authContext)
    // const {registerState: { isRegistered, isVerified}} = useContext(authContext)
    // const {authState: { isAuthenticated }} = useContext(authContext)


    // if (!isRegistered) return <Navigate to='/register' />
    // if (isVerified) return <Navigate to='/login' />

    const isSuccess = async() => {
        const check = await verifyEmail(token);
        if (check) {
            setSuccess(true);
        }
    }
    isSuccess();
    if (!success) {
        return(
        <div>
            <h1>Can not verify your account</h1>
            <p className="center">Your account can not be verified. Please check your mail again to make sure the link is right.</p>
        </div>
        )
    }
    return (
        <div>
            <h1>Verify successfully</h1>
            <p className="center">Your account has been verified successfully. Please login to use our platform.</p>
            <div className='center'>
                <Link to='/login' className='buttonLogin' style={{color: "white", textDecoration: "none"}}>Login</Link>
            </div>
            
        </div>
    );
}

export default VerifySuccess;