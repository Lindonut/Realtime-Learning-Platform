import React from 'react';
import axios from 'axios'
import {authContext} from '../../contexts/authContext'
import {useState, useContext, useEffect, useRef} from 'react'
import { toast } from "react-toastify"
import {Link, Navigate, useNavigate} from "react-router-dom"

const loadScript = (src) =>
    new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
})

const GOOGLE_GSI_URL = 'https://accounts.google.com/gsi/client';
const GOOGLE_LOGIN_URL = `${process.env.REACT_APP_API_URL}/api/auth/login/google`;
const GOOGLE_CLIENT_ID = "1050302211319-ed7il7goqtplgdpnd07ldeuk6d9bm1jm.apps.googleusercontent.com";

function GoogleLoginButton() {
    const ref = useRef(null);
    const navigate = useNavigate();

    const handleCallbackResponse = async (response) => {
        try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login/google`, response)
          if (res.data.success) {
            const token = res.data.accessToken;
            localStorage.setItem("token", token);
            window.location.reload(true);
            toast.success(res.data.message);
          }
          else{
            toast.warning(res.data.message);
          }
        } catch (error) {
          toast.error('Login error. Can not try right now.');
          console.log(error);
        }
    };

    useEffect(() => {
        loadScript(GOOGLE_GSI_URL)
          .then(() => {
            /*global google*/
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleCallbackResponse,
                login_uri: GOOGLE_LOGIN_URL,
                auto_select: false,
            });

            google.accounts.id.disableAutoSelect();

            google.accounts.id.renderButton(ref.current, {
                theme: 'outline',
                size: 'large',
            });
        })
        .catch(console.error)
        return () => {
          const scriptTag = document.querySelector(`script[src="${GOOGLE_GSI_URL}"]`)
          if (scriptTag) document.body.removeChild(scriptTag)
        }
    }, [])

    return <div ref={ref}></div>;
};

export default GoogleLoginButton;