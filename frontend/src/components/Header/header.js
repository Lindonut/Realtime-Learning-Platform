import React from 'react'
import { useContext } from 'react'
import '../../../src/App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Form, Button} from 'react-bootstrap';
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
                    <div className='border-brand justify-content-start'>
                        <a href='/' className='title-brand'>REALTIME LEARNING PLATFORM</a>
                    </div>
                </Navbar.Brand>
                <div className='center-code-form'>
                    <Form className="code-box">
                            <p className='code-text'>Want to join a presentation?&nbsp;&nbsp;&nbsp;</p>
                            <input placeholder='Enter the code here'/>&nbsp;&nbsp;&nbsp;
                        <Button variant="btn btn-primary">Join</Button>
                    </Form> 
                </div>     
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