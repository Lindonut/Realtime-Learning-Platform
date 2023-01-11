import React from 'react'
import { useParams } from 'react-router-dom'
import '../../../../App.css'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import {authContext} from '../../../../contexts/authContext'

const Description = () => {
    const {authState: { isAuthenticated, user }} = useContext(authContext)
    let {groupID} = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [group, setGroup] = useState([]);
    const [description, setDescription] = useState([]);
    const [memRole, setMemRole] = useState();
    useEffect(() => {
        getAllData()
    }, []);

    const getAllData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/group/${groupID}`)
            .then(res => {
                setGroup(res.data.group)
                setDescription(res.data.group.description);
            }
            )
            .catch(err => console.log(err))
    }

    

    const handleUpdate = async() => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/group/${groupID}/updateDescription`, {description})
            if(res.data.success)
            {
                handleClose();
                toast.success(res.data.message); 
            }
            else  
                toast.warning(res.data.message)
        } catch (error) {
            toast.error("Error. Can not update description right now. Please try again later.");
        }
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
            <div className='header-page'>
                <span className="page-title">Description Page</span>
                {role == "Owner" ? (
                    <span className='add-btn'>
                        <Button variant="primary" onClick={handleShow}>
                            Update Description
                        </Button>
                    </span>
                ) : (
                    <div/>
                )}
            </div>
            <div className='description' style={{whiteSpace: 'pre-line'}}>
                {description}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Group's Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <textarea id="description" name="description" rows="6" cols="60" style={{whiteSpace: 'pre-line'}} onChange={(e) => setDescription(e.target.value)}>
                {description}
                </textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Description