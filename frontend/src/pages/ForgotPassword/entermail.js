import {authContext} from '../../contexts/authContext'
import {Navigate, useParams} from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';

function RecoverMail() {
    //const {registerState: { isRegistered, isVerified}} = useContext(authContext)
    //const {isAuthenticated, user} = useContext(authContext)


    // if (!isRegistered) return <Navigate to='/register' />
    //if (isVerified) return <Navigate to='/' />
    const [email, setEmail] = useState('');
    const handleSend = async() => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/resetpassword/sendmail`, {email});
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
        <div className='container'>
            <h1>Forgot Your Password?</h1>
            <p className="center">Please enter the email you use to sign in to Realtime Learning Platform.</p>
            <div className="center">
                <input type="email" name="email" placeholder='Your email address' onChange={(e) => setEmail(e.target.value)}/>
                <Button className='sendBtn' variant="primary" onClick={handleSend}>Send</Button>
            </div>
        </div>
    )
}

export default RecoverMail;