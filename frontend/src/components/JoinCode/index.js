import React from 'react'
import '../../../src/App.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const JoinCode = () => {
    return (
        <div className='header center'>
            <Navbar>
                <div className='code-box'>
                    <p className='code-text'>Want to join a presentation?&nbsp;&nbsp;&nbsp;</p>
                    <input placeholder='Enter the code here'/>&nbsp;&nbsp;&nbsp;
                    <button className='btn btn-primary'>Join</button>
                </div>
            </Navbar>
        </div>
    )
}

export default JoinCode