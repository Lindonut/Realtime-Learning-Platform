import '../../../../App.css'
import Table from 'react-bootstrap/Table';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Member = () => {
    let { groupID } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [member, setMember] = useState([]);
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
            getAllData();
            navigate(`/infogroup/${groupID}/member`)
        })
    }
    const arr = member.map((member) => {
        return (
            <tr key={member._id}>
                <td>{member.member}</td>
                <td>{member.role}</td>
                <td>
                    {/* <Link to={`/infomation/${member.member}`} style={{color: "black", textDecoration: "none"}}>
                         Show Info</Link> */}
                    <NavDropdown title="Option" id="basic-nav-dropdown" className='border-name' >
                        <NavDropdown.Item>
                            <Link to={`/infomation/${member.member}`} style={{ color: "black", textDecoration: "none" }}>Show Info</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={`/infomation/${member.member}`} style={{ color: "black", textDecoration: "none" }}>Change Role</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link onClick={() => DeleteMember(member)} style={{ color: "black", textDecoration: "none" }}>Delete</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </td>
            </tr>
        )
    })

    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const postData = () => {
    //     axios.post(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`, {
    //         firstName,
    //         lastName
    //     }).then(() => {
    //         navigate('/')
    //         getAllData()
    //         handleClose()
    //     })
    // }
    // const getAllData = () => {
    //     axios.get('https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData')
    //         .then(res => {
    //             console.log("Getting From:  ", res.data)
    //             setMember(res.data)
    //         }
    //         )
    //         .catch(err => console.log(err))
    // }
    // useEffect(() => {
    //     getAllData()
    // }, []);
    // const arr = member.map((member) => {
    //     return (
    //         <tr>
    //             <td>{member.id}</td>
    //             <td>{member.firstName}</td>
    //             <td>{member.lastName}</td>
    //             <td>@mdo</td>
    //         </tr>

    //     )
    // })


    return (
        <>
            <div className='header-member'>
                <span className="member-title">Member List</span>
                <span className='add-member-btn'>
                    <Button variant="primary" onClick={handleShow}>
                        Add Member
                    </Button>
                </span>
            </div>
            <div className='table-member'>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>Member</th>
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
                    <Modal.Title>Add new Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Input member email
                    </div>
                    <input type="text"></input>
                    <div>
                        Create an invitation Link
                    </div>
                    <button> Click me!</button>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Member