import '../../../App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const navigate = useNavigate();
    // const [group, setGroup] = useState([]);
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
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Group Name</Link>
                    </div>
                    <div className='group-description'>Group Description</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Group Name</Link>
                    </div>
                    <div className='group-description'>Group Description</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Group Name</Link>
                    </div>
                    <div className='group-description'>Group Description</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Group Name</Link>
                    </div>
                    <div className='group-description'>Group Description</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Group Name</Link>
                    </div>
                    <div className='group-description'>Group Description</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Group Name</Link>
                    </div>
                    <div className='group-description'>Group Description</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Group Name</Link>
                    </div>
                    <div className='group-description'>Group Description</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Group Name</Link>
                    </div>
                    <div className='group-description'>Group Description</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Group Name</Link>
                    </div>
                    <div className='group-description'>Group Description</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Group Name</Link>
                    </div>
                    <div className='group-description'>Group Description</div>
                </div>
                {/* {arr} */}
            </div>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>First Name</label>
                    <input placeholder='First Name'  />
                    <label>Last Name</label>
                    <input placeholder='Last Name' />
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

export default Dashboard