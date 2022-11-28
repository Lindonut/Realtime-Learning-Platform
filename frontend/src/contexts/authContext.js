import {createContext, useReducer, useEffect} from 'react'
import axios from 'axios'
import {API} from '../config/api'
import { authReducer } from '../reducers/authReducer'
import setAccessToken from '../utils/setAccessToken'


export const authContext = createContext()

const AuthContextProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, {
		isAuthenticated: false,
		user: null
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
                name = res.data.name
                email = res.data.email
                password = res.data.password
                return res.data
        } catch (error) {
            if(error.res.data)
                return error.res.data
            else return {success:false, message: error.message}}
    }

    //Logout
    const logoutUser = () => {
		localStorage.removeItem('token')
		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null }
		})
	}

    const authContextData = {loginUser, registerUser, logoutUser, authState}

    return (
        <authContext.Provider value={authContextData}>
            {children}
        </authContext.Provider>
    )

}

export default AuthContextProvider;