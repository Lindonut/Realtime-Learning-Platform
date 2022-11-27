import React from 'react'
import '../../../App.css'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Description from './description/description'
import Member from './member/member'
import Dashboard from '../dashboard/dashboard'
import Infomation from '../infomation/infomation'

const Infogroup = () => {
    return (
        <>
            <Navbar bg="light" variant="light">
                <span className='infogroup-name'>Kiến tập nghề nghiệp</span>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end border-info">
                    <Link to="/infogroup" className='infogroup-tool'>Description</Link>
                    <Link to="/infogroup/member" className='infogroup-tool'>Member</Link>
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
        </>
    )
}

export default Infogroup