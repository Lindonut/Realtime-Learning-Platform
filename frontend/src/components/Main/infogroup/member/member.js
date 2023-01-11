import '../../../../App.css'
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
import {authContext} from '../../../../contexts/authContext'
import { toast } from "react-toastify"

const Member = () => {
    const {authState: { isAuthenticated, user }} = useContext(authContext)
    let { groupID } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [member, setMember] = useState([]);
    const [memRole, setMemRole] = useState();
    const [email, setEmail] = useState('');
    const userID = user._id;
    const getAllData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/group/${groupID}/member`)
            .then(res => {
                setMember(res.data)
            }
            )
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getAllData()
    }, []);

    const DeleteMember = (member) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/group/${groupID}/member/delete/${member.member}`)
        .then (res => {
            toast.success("Delete member successfully.");
            getAllData();
            navigate(`/infogroup/${groupID}/member`)
        })
    }
    const ChangeRole = async (member) => {
        const role = member.role;
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/group/${groupID}/member/update/${member.member}`,{role: role})
            console.log(res.data);
            if(res.data.success) {
                toast.success(res.data.message);
            }
            else
            {
                toast.warning(res.data.message);
            }
        } catch (error) {
            toast.error("Can not change role of member right now. Please try again later.")
            console.log(error);
        }
        navigate(`/infogroup/${groupID}/member`)
        getAllData();
    }

    const handleSend = async() => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/group/${groupID}/sendinvitationmail`, {userID, email});
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

    const arr = member.map((member) => {
        return (
            <tr key={member.member}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                {role == "Owner"? (
                    <>
                    {role == "Owner" && member.role == "Owner" ? (
                    <div/>
                    ) : (
                    <NavDropdown title="Option" id="basic-nav-dropdown" className='option-btn' >
                        <NavDropdown.Item>
                            <Link onClick={() => ChangeRole(member)} style={{ color: "black", textDecoration: "none" }}>Change Role</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link onClick={() => DeleteMember(member)} style={{ color: "black", textDecoration: "none" }}>Delete</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    )}
                    </>
                ) : (
                    <div/>
                )}
                </td>
            </tr>
        )
    })


    return (
        <>
            <div className='header-page'>
                <span className="page-title">Member List</span>
                {role == "Owner" ? (
                    <span className='add-btn'>
                        <Button variant="primary" onClick={handleShow}>
                            Add Member
                        </Button>
                    </span>
                ) : (
                    <div/>
                )}
            </div>
            <div className='table-member'>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Email</th>
                            <th>Role</th>
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
                    <Modal.Title>Add New Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="email" name="email" placeholder='Your email address' onChange={(e) => setEmail(e.target.value)}/>
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

export default Member