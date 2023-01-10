import {authContext} from '../../contexts/authContext'
import {Navigate, useParams} from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';

function Verify() {
    //const {registerState: { isRegistered, isVerified}} = useContext(authContext)
    //const {isAuthenticated, user} = useContext(authContext)


    // if (!isRegistered) return <Navigate to='/register' />
    //if (isVerified) return <Navigate to='/' />
    let { userID } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        findUser();

    }, []);

    const findUser = async() => {
        try {
            const dt = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/finduser/${userID}`)
            if(dt.data.success)
            {
             setUser(dt.data.user)  
            }
            else {
                console.log(dt.data.message);
            }
                
        } catch (error) {
            console.log(error);
        }
    }
    const email = user.email;
    const handleResend = async() => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/verify/resendmail`, {email});
            if(res.data.success)
            {
                toast.success(res.data.message); 
            }
            else  
                toast.warning(res.data.message)
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <h1>Verify your email address</h1>
            <p className="center">We have sent an email to your email address to verify your email address and activate your account. </p>
            <p className="center">The link in the email will expire in 24 hours.</p>
            <br/>
            <div className="center">
                <input type="hidden" name="email" value={email}/>
                <Button variant="primary" onClick={handleResend}>Resend</Button>
            </div>
        </div>
    );
}

export default Verify;