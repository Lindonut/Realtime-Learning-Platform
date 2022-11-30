import '../../../App.css'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import setAccessToken from '../../../utils/setAccessToken'
import { authContext } from '../../../contexts/authContext';

const Dashboard = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [group, setGroup] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

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
            handleClose()
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
            <div className='header-dashboard'>
                <span className="dashboard-title">Dashboard Page</span>
                <span className='create-group-btn'>
                    <Button variant="primary" onClick={handleShow}>
                        Create Group
                    </Button>
                </span>
            </div>
            <div class="flex-container">
                {arr}
            </div>
            <Modal show={show} onHide={handleClose}>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={postGroup}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Dashboard