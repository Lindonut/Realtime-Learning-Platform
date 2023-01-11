import '../../../App.css'
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {authContext} from '../../../contexts/authContext'
import { toast } from "react-toastify"

const Collab = () => {
    const {authState: { isAuthenticated, user }} = useContext(authContext)
    const userID = user._id;
    let { groupID } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [collab, setCollab] = useState([]);
    const [email, setEmail] = useState();
    const [ownerID, setOwnerID] = useState();
    const [owner, setOwner] = useState(false);
    let { idpp } = useParams();
    const getAllData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/presentation/${idpp}`)
            .then(res => {
                setOwnerID(res.data.presentation.owner);
                setCollab(res.data.collab);
            }
            )
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getAllData()
    }, []);

    const DeleteCollab = (collab) => {
        console.log('DeleteCollab');
        axios.post(`${process.env.REACT_APP_API_URL}/presentation/${idpp}/deletecollab`,{collab})
        .then (res => {
            if(res.data.success)
            {
                toast.success(res.data.message);
            }
            else{
                toast.warning(res.data.message);
            }
            getAllData();
            navigate(`/presentation/${idpp}/collab`)
        })
    }

    const handleSend = async() => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/presentation/${idpp}/sendcollabmail`, {userID, email});
            if(res.data.success)
            {
                toast.success(res.data.message); 
                handleClose();
            }
            else  
                toast.warning(res.data.message)
        } catch (error) {
            toast.error(error.message);
        }
    }

    const arr = collab.map((collab) => {
        return (
            <tr key={collab}>
                <td>{collab}</td>
                <td>
                    { ownerID == userID ? (
                    <NavDropdown title="Option" id="basic-nav-dropdown" className='option-btn' >
                        <NavDropdown.Item>
                            <div onClick={() => DeleteCollab(collab)} style={{ color: "black", textDecoration: "none" }}>Delete</div>
                        </NavDropdown.Item>
                    </NavDropdown>
                    ):(
                        <></>
                    )}
                </td>
            </tr>
        )
    })


    return (
        <>
            <div className='header-page'>
                <span className="page-title">Collaborator List</span>
                <span className='add-btn'>
                    <Button variant="primary" onClick={handleShow}>
                        Add Collaborator
                    </Button>
                </span>
            </div>
            <div className='table-member'>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>Collaborator</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr}
                    </tbody>
                </Table>

            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Collaborator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="email" name="email" placeholder='Email address' onChange={(e) => setEmail(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSend}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Collab 