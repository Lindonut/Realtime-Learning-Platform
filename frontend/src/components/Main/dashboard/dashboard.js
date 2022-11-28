import '../../../App.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                        <Link to='/infogroup'>Kiến tập nghề nghiệp</Link>
                    </div>
                    <div className='group-description'>Chiều thứ 4 12h30-15h00</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Kiến tập nghề nghiệp</Link>
                    </div>
                    <div className='group-description'>Chiều thứ 4 12h30-15h00</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Kiến tập nghề nghiệp</Link>
                    </div>
                    <div className='group-description'>Chiều thứ 4 12h30-15h00</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Kiến tập nghề nghiệp</Link>
                    </div>
                    <div className='group-description'>Chiều thứ 4 12h30-15h00</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Kiến tập nghề nghiệp</Link>
                    </div>
                    <div className='group-description'>Chiều thứ 4 12h30-15h00</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Kiến tập nghề nghiệp</Link>
                    </div>
                    <div className='group-description'>Chiều thứ 4 12h30-15h00</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Kiến tập nghề nghiệp</Link>
                    </div>
                    <div className='group-description'>Sáng thứ 3 6h40-9h10</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Kiến tập nghề nghiệp</Link>
                    </div>
                    <div className='group-description'>Sáng thứ 5 9h30-12h00</div>
                </div>
                <div className='group-item'>
                    <div className='group-title'>
                        <Link to='/infogroup'>Kiến tập nghề nghiệp</Link>
                    </div>
                    <div className='group-description'>Sáng thứ 6 9h30-12h00</div>
                </div>
            </div>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Input your Group Name
                    </div>
                    <input type="text"></input>
                    <div>
                        Input your Group Description
                    </div>
                    <input type="text"></input>
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