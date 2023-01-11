import React from 'react'
import '../../../App.css'
import { Outlet, Link, useParams, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import setAccessToken from '../../../utils/setAccessToken'
import { toast } from "react-toastify"
import {authContext} from '../../../contexts/authContext'

const Infogroup = () => {
    const {authState: { isAuthenticated, user }} = useContext(authContext)
    let { groupID } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const [group, setGroup] = useState([]);
    const [link, setLink] = useState();
    const [memRole, setMemRole] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        getAllData()
    }, []);

    const getAllData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/group/${groupID}`)
            .then(res => {
                setGroup(res.data)
                setLink(res.data.link)
            }
            )
            .catch(err => console.log(err))
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleShowDelete = () => {
        setShowDelete(true);
    }

    const handleDelete = async() => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/group/${groupID}`)
            console.log("res", res);
            if(res.data.success) {
                toast.success(res.data.message);
            }
            else
            {
                toast.warning(res.data.message);
            }
        } catch (error) {
            toast.error("Can not delete group right now. Please try again later.")
            console.log(error);
        }
        navigate('/')
        getAllData();
    }


    const userID = user._id;
    const getMember = async() => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/group/${groupID}/${userID}`)
            console.log("res", res);
            if(res.data.success)
            {
                setMemRole(res.data.role);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMember()
    }, []);

    let role = memRole;

    return (
        <>
            <Navbar bg="light" variant="light">
                <span className='infogroup-name'>{group.name}</span>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end border-info">
                    {role == "Owner" ? (
                    <div>
                        <span className='in-group-btn'>
                            <Button variant='primary' onClick={handleShow}>Get Invitation Link</Button>
                        </span>
                        <span className='in-group-btn'>
                            <Button variant='btn btn-danger' onClick={handleShowDelete}>Delete Group</Button>
                        </span>
                    </div>
                    ) : (
                        <div/>
                    )}
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
                    <label>Link</label>
                    <input value={link} readOnly/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you really want to delete this group? This process can not be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                    <Button variant="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Infogroup