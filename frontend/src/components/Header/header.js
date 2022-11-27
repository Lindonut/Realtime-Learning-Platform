import React from 'react'
import '../../../src/App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <Navbar>
                <Navbar.Brand>
                    <div className='border-brand'>
                        <Link to='/' className='title-brand'>LEARNING PLATFORM</Link>
                    </div>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end border-info">
                    <NavDropdown title="YOUR NAME HERE" id="basic-nav-dropdown" className='border-name' >
                        <NavDropdown.Item>
                            <Link to="/infomation" className='dropdowm-item'> My Info</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/infomation" className='dropdowm-item'> My Info</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>

        </div>
    )
}

export default Header