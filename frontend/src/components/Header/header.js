import React from 'react'
import { useContext } from 'react'
import '../../../src/App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';

const Header = () => {
    const { authState: { isAuthenticated, user } } = useContext(authContext)
    const { logoutUser } = useContext(authContext)
    const handleClick = async () => {
        await logoutUser();
        
        console.log('Hello world');
    }
    return (
        <div className='header'>
            <Navbar>
                <Navbar.Brand>
                    <div className='border-brand'>
                        <a href='/' className='title-brand' style={{color: "white", textDecoration: "none"}}>REALTIME LEARNING PLATFORM</a>
                    </div>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end border-info">
                    <NavDropdown title={user.name} style={{color: "white", textDecoration: "none"}} id="basic-nav-dropdown" className='border-name' >
                        <NavDropdown.Item>
                            <Link to={`/infomation/${user._id}`} style={{color: "black", textDecoration: "none"}} className='dropdowm-item'> My Info</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={`/presentation/${user._id}`} style={{color: "black", textDecoration: "none"}} className='dropdowm-item'> My Presentation</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/login" style={{color: "black", textDecoration: "none"}} onClick={handleClick} className='dropdowm-item'> Log out</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>

        </div>
    )
}

export default Header