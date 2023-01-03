import React from 'react'
import '../../../App.css'
import { Routes, Route, Outlet, Link, useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Description from './description/description'
import Member from './member/member'
import Dashboard from '../dashboard/dashboard'
import Infomation from '../infomation/infomation'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import setAccessToken from '../../../utils/setAccessToken'
import { toast } from "react-toastify"

const Infogroup = () => {
    let { groupID } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [group, setGroup] = useState([]);
    const [link, setLink] = useState();
    const [code, setCode] = useState();
    useEffect(() => {
        getAllData()

    }, []);

    const getAllData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/group/${groupID}`)
            .then(res => {
                setGroup(res.data)
                setLink(res.data.link)
                setCode(res.data.group.linkCode)
            }
            )
            .catch(err => console.log(err))
    }

    const handleShow = () => {
        setShow(true);
    }


    return (
        <>
            <Navbar bg="light" variant="light">
                <span className='infogroup-name'>{group.name}</span>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end border-info">
                    <span className='in-group-btn'>
                        <Button variant='primary' onClick={handleShow}>Get Invitation Link</Button>
                    </span>
                    <span className='in-group-btn'>
                        <Link to={`/infogroup/${groupID}`} className='infogroup-tool' variant='primary'>Description</Link>
                    </span>
                    <span className='in-group-btn'>
                        <Link to={`/infogroup/${groupID}/member`} className='infogroup-tool' variant='primary'>Member</Link>
                    </span>
                    
                </Navbar.Collapse>
            </Navbar>
            <Outlet />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Group Invitation Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Code</label>
                    <input value={code} readOnly/>
                    <label>Link</label>
                    <input value={link} readOnly/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Infogroup