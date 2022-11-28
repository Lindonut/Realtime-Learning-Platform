import React, { useState } from 'react'
import { Modal, ModalHeader } from 'reactstrap'
import { Routes, Route, Link, Router, Outlet } from 'react-router-dom'
import '../../../src/App.css'
import Dashboard from './dashboard/dashboard'
import Infomation from './infomation/infomation'
import Infogroup from './infogroup/infogroup'
import Description from './infogroup/description/description'
import Member from './infogroup/member/member'

const Main = () => {
    return (
        <div className='main'>
                <Outlet/>
        </div>
    )
}

export default Main