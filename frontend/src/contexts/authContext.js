import {createContext, useReducer} from 'react'
import axios from 'axios'
import {API} from '../config/api'

export const authContext = createContext()

const AuthContextProvider = ({children}) => {
    
    //Login 
    const loginUser = async (email, password) => {
        try {
            const res =  await axios.post(`${API}/api/auth/login`, {email, password})
            if(res.data.success)
                localStorage.setItem('token', res.data.accessToken)
                email = res.data.email
                password = res.data.password
                return res.data
        } catch (error) {
            if(error.res.data)
                return error.res.data
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

    const authContextData = {loginUser, registerUser}

    return (
        <authContext.Provider value={authContextData}>
            {children}
        </authContext.Provider>
    )

}

export default AuthContextProvider;