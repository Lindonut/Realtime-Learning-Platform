import React from 'react'
import '../../../src/App.css'
import Navbar from 'react-bootstrap/Navbar';
import { Link, Navigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const GuestHeader = () => {
    return (
        <div className='header'>
            <Navbar>
                <Navbar.Brand>
                    <div className='border-brand justify-content-start'>
                        <a href='/' className='title-brand'>REALTIME LEARNING PLATFORM</a>
                    </div>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end border-info">
                    <Nav.Link href="/login" className='guest-nav'>Login</Nav.Link>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Nav.Link href="/register"  className='guest-nav'>Register</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default GuestHeader;