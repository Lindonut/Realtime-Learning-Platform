import {createContext, useReducer, useEffect} from 'react'
import axios from 'axios'
import {API} from '../config/api'
import { authReducer } from '../reducers/authReducer'
import { registerReducer } from '../reducers/registerReducer'
import setAccessToken from '../utils/setAccessToken'


export const authContext = createContext()

const AuthContextProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, {
		isAuthenticated: false,
		user: null
	})

    const [registerState, dispatch1] = useReducer(registerReducer, {
		isRegistered: false,
        isVerified: false
	})

    // Authenticate
	const loadUser = async () => {
		if (localStorage.token) {
			setAccessToken(localStorage.token)
		}
		try {
			const res = await axios.get(`${API}/api/auth/`)
			if (res.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: res.data.user }
				})
			}
		} catch (error) {
			localStorage.removeItem("token")
			setAccessToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null }
			})
		}
	}

	useEffect(() => {
        loadUser();
      }, [])

    //Login 
    const loginUser = async (email, password) => {
        try {
            const res =  await axios.post(`${API}/api/auth/login`, {email, password})
            if(res.data.success)
                localStorage.setItem('token', res.data.accessToken)
                email = res.data.email
                password = res.data.password
                await loadUser()
                return res.data
        } catch (error) {
            if(error.response.data)
                return error.response.data
            else return {success:false, message: error.message}}
    }

    //Register 
    const registerUser = async (name, email, password) => {
        try {
            const res =  await axios.post(`${API}/api/auth/register`, {name, email, password})
            if(res.data.success)
            {
                if(res.data.newUser.verified)
                {
                    dispatch1({
                        type: 'SET_REGISTER',
                        payload: { isRegistered: true, isVerified: true }
                    })
                }
                else
                {
                    dispatch1({
                        type: 'SET_REGISTER',
                        payload: { isRegistered: true, isVerified: false }
                    })
                }
                return res.data
            }
        } catch (error) {
            dispatch1({
                type: 'SET_REGISTER',
                payload: { isRegistered: false, isVerified: false }
            })
            if(error.response.data)
                return error.response.data
            else return {success:false, message: error.message}}
    }

    //Logout
    const logoutUser = async() => {
		localStorage.removeItem('token')
        await axios.post(`${API}/api/auth/logout`)
		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null }
		})
	}

    //Verify Email
    const verifyEmail = async (token) => {
        console.log(token)
        try {
            const res =  await axios.get(`${API}/api/auth/verify/${token}`)
            console.log(res.data)
            if(res.data.success)
            {
                return true;
            }
        }catch(error){
            return false
        }
    }


    const authContextData = {loginUser, registerUser, logoutUser, authState, verifyEmail, registerState}

    return (
        <authContext.Provider value={authContextData}>
            {children}
        </authContext.Provider>
    )

}

export default AuthContextProvider;