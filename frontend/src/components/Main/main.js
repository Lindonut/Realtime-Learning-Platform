import React, { useState } from 'react'
import { Modal, ModalHeader } from 'reactstrap'
import { Routes, Route, Link } from 'react-router-dom'
import '../../../src/App.css'
import Dashboard from './dashboard/dashboard'
import Infomation from './infomation/infomation'
import Infogroup from './inforgroup/infogroup'
import Description from './inforgroup/description/description'
import Member from './inforgroup/member/member'

const Main = () => {
    return (
        <div className='main'>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/infomation" element={<Infomation />} />
                <Route path="/infogroup" element={<Infogroup />}>
                    <Route path="/infogroup" element={<Description />} />
                    <Route path="/infogroup/member" element={<Member />} />
                </Route>
            </Routes>
        </div>
    )
}

export default Main