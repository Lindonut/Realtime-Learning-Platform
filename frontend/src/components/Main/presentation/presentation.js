import React, { useState, useEffect } from 'react'
import '../../../App.css'
import Button from 'react-bootstrap/Button';
import { useContext } from 'react'
import { authContext } from '../../../contexts/authContext'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
const Presentation = () => {
    const { authState: { isAuthenticated, user } } = useContext(authContext)
    let { id } = useParams();
    const getAllData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/presentation`)
            .then(res => {
                setPresentation(res.data)
            }
            )
            .catch(err => console.log(err))
    }
    const [presentations, setPresentation] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [show, setShow] = useState(false);
    const [showRename, setShowRename] = useState(false);

    const [presentationName, setPresentationName] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const postPresentation = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/presentation/add`, {
            name: presentationName,
            owner: id
        }).then((res) => {
            navigate(`/presentation/${id}`)
            getAllData()
            handleClose()
        })
    }
    const deletePresentation = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/presentation/${presentations[currentIndex]._id}/delete`)
            .then(res => {
                navigate(`/presentation/${id}`)
                getAllData()
            }
            )
            .catch(err => console.log(err))
    }
    const editPresentation = () => {
        console.log(id);
        console.log(presentations[currentIndex]._id);
        navigate(`/presentation/${id}/${presentations[currentIndex]._id}/edit`)

    }
    const handleShowRename = () => {
        setShowRename(true);
    }
    const handleCloseRename = () => {
        setShowRename(false);
    }
    const renamePresentation = () => {
        axios.patch(`${process.env.REACT_APP_API_URL}/presentation/${presentations[currentIndex]._id}/update`, 
            {
                name: presentationName
            }
        )
            .then(res => {
                navigate(`/presentation/${id}`)
                getAllData()
                handleCloseRename();
            }
            )
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getAllData()
    }, []);
    const arr = presentations.map((presentation, index) => {
        let classNameX = "presentation-item";

        if (index === currentIndex) {
            classNameX = classNameX + " " + "active";
        }

        return (
            <>
                <tr key={presentation.id}
                    onClick={() => setCurrentIndex(index)}
                    className={classNameX}
                >
                    <th>{index+1}</th>
                    <th>{presentation.name}</th>
                </tr>
            </>

        )
    })
    return (
        <>
            <Navbar bg="light" variant="light">
                <span className="dashboard-title">Presentation Page</span>
                <Navbar.Collapse className="justify-content-end border-info">
                    <span className='create-group-btn'>
                        <Button variant='primary' onClick={handleShow}>Create</Button>
                    </span>
                    <span className='create-group-btn'>
                        <Button variant='primary' onClick={deletePresentation}>Delete</Button>
                    </span>
                    <span className='create-group-btn'>
                        <Button variant='primary' onClick={editPresentation}>Edit</Button>
                    </span>
                    <span className='create-group-btn'>
                        <Button variant='primary' onClick={handleShowRename}>Rename</Button>
                    </span>
                </Navbar.Collapse>
            </Navbar>
            <div className='table-member'>
                <Table striped bordered hover size="sm" >
                    <thead hidden={true}>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr}
                    </tbody>
                </Table>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new Presentation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Presentation Name</label>
                    <input placeholder='Presentation Name' onChange={(e) => setPresentationName(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={postPresentation}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showRename} onHide={handleCloseRename}>
                <Modal.Header closeButton>
                    <Modal.Title>Rename Presentation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>New Presentation Name</label>
                    <input placeholder='Presentation Name' onChange={(e) => setPresentationName(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRename}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={renamePresentation}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Presentation