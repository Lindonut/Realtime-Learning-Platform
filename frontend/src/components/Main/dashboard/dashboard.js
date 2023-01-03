import '../../../App.css'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import setAccessToken from '../../../utils/setAccessToken'
import { authContext } from '../../../contexts/authContext';
import Navbar from 'react-bootstrap/Navbar';

const Dashboard = () => {

    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const [showJoin, setShowJoin] = useState(false);
    const handleCloseJoin = () => setShowJoin(false);
    const handleShowJoin = () => setShowJoin(true);

    const navigate = useNavigate();
    const [group, setGroup] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    const [groupInvitationCode, setGroupInvitationCode] = useState('');

    const { authState: { isAuthenticated, user } } = useContext(authContext)
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
    //             setGroup(res.data)
    //         }
    //         )
    //         .catch(err => console.log(err))
    // }
    // useEffect(() => {
    //     getAllData()
    // }, []);
    // const arr = group.map((group) => {
    //     return (
    //         <div className='group-item'>
    //             <div className='group-title'>
    //                 <Link to='/infogroup'>{group.firstName}</Link>
    //             </div>
    //             <div className='group-description'>{group.lastName}</div>
    //         </div>
    //     )
    // })

    const getAllData = () => {
        if (localStorage.token) {
			setAccessToken(localStorage.token)
		}
        axios.get(`${process.env.REACT_APP_API_URL}/group`)
            .then(res => {
                setGroup(res.data)
            }
            )
            .catch(err => console.log(err))
    }
    const addGroupMember = (req) => {
        axios.post(`${process.env.REACT_APP_API_URL}/group/addmember`, {
            groupID: req.data._id,
            member: user._id,
            role: "Owner"
        }).then(res => {
        }
        )
        .catch(err => console.log(err))
    }
    const postGroup = () => {
        if (localStorage.token) {
			setAccessToken(localStorage.token)
		}
        axios.post(`${process.env.REACT_APP_API_URL}/group/add`, {
            name: groupName,
            description: groupDescription,
            owner: user._id
        }).then((res) => {
            navigate('/')
            addGroupMember(res);
            getAllData()
            handleCloseCreate()
        })
    }

    const joinGroup = () => {
        if (localStorage.token) {
			setAccessToken(localStorage.token)
		}
        axios.post(`${process.env.REACT_APP_API_URL}/group/add`, {
            name: groupName,
            description: groupDescription,
            owner: user._id
        }).then((res) => {
            navigate('/')
            addGroupMember(res);
            getAllData()
            handleCloseJoin()
        })
    }

    useEffect(() => {
        getAllData()
    }, []);
    const arr = group.map((group) => {
        return (
            <div className='group-item' key={group._id}>
                <div className='group-title'>
                    <Link to={`/infogroup/${group._id}`}>{group.name}</Link>
                </div>
                <div className='group-description'>{group.description}</div>
            </div>
        )
    })
    return (
        <>
            <Navbar bg="light" variant="light">
            <span className="dashboard-title">Dashboard Page</span>
                <Navbar.Collapse className="justify-content-end border-info">
                    <span className='create-group-btn'>
                        <Button variant='primary' onClick={handleShowCreate}>Create Group</Button>
                    </span>
                    <span className='create-group-btn'>
                        <Button variant='primary' onClick={handleShowJoin}>Join Group</Button>
                    </span>
                    
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
            <div class="flex-container">
                {arr}
            </div>
            <Modal show={showCreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Group Name</label>
                    <input placeholder='Group Name' onChange={(e) => setGroupName(e.target.value)} />
                    <label>Group Description</label>
                    <input placeholder='Group Description' onChange={(e) => setGroupDescription(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={postGroup}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showJoin} onHide={handleCloseJoin}>
                <Modal.Header closeButton>
                    <Modal.Title>Join Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Enter Group Invitation Code</label>
                    <input placeholder='Group Invitation Code' onChange={(e) => setGroupInvitationCode(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseJoin}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={joinGroup}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Dashboard