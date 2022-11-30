import {authContext} from '../../contexts/authContext'
import {Navigate} from 'react-router-dom'
import {useContext} from 'react'

function Verify() {
    // const {registerState: { isRegistered, isVerified}} = useContext(authContext)
    // const {authState: { isAuthenticated }} = useContext(authContext)


    // if (!isRegistered) return <Navigate to='/register' />
    // if (isVerified) return <Navigate to='/' />
    return (
        <div>
            <h1>Verify your email address</h1>
            <p className="center">We have sent an email to your email address to verify your email address and activate your account. The link in the email will expire in 24 hours</p>
        </div>
    );
}

export default Verify;