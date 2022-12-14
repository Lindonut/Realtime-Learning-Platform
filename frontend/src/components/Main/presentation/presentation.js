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
const Presentation = () => {
    const { authState: { isAuthenticated, user } } = useContext(authContext)
    let { id } = useParams();
    const [presentations, setPresentation] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [show, setShow] = useState(false);

    const [presentationName, setPresentationName] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const postPresentation = () => {
        let number = presentations.length +1;
        presentations.push({ id: number, presentationName: presentationName})
        navigate(`/presentation/${id}`);
        handleClose();
    }
    const deletePresentation = () => {
        alert("Do you want to delete presentation " + (currentIndex + 1) + "?");
        presentations.splice(currentIndex,1);
        reMarkId();
        setCurrentIndex(currentIndex-1);
        navigate(`/presentation/${id}`);
    }
    const reMarkId = () => {
        for (var i = 0;i < presentations.length; i++) 
        {
            presentations[i].id = i+1;
        }
    }
    useEffect(() => {
        const lists = []
        lists.push({ id: 1, presentationName: "Presentation-1" });
        lists.push({ id: 2, presentationName: "Presentation-2" });
        lists.push({ id: 3, presentationName: "Presentation-3" });
        lists.push({ id: 4, presentationName: "Presentation-4" });
        lists.push({ id: 5, presentationName: "Presentation-5" });
        lists.push({ id: 6, presentationName: "Presentation-6" });
        lists.push({ id: 7, presentationName: "Presentation-7" });
        setPresentation(lists)
    }, [])
    const arr = presentations.map((presentation, index) => {
        let active = {};
        if (index === currentIndex)
        {
            active = {background: 'aquas'};
        }
        return (
            <>
                <tr key={presentation.id}
                onClick={()=> setCurrentIndex(index)}
                style = {active}
                >
                    <th>{presentation.id}</th>
                    <th>{presentation.presentationName}</th>
                    <th>
                        <Link to={`/presentation/${id}/${presentation.presentationName}/edit`} style={{ color: "black", textDecoration: "none" }}>Edit</Link>
                    </th>
                </tr>
            </>

        )
    })
    return (
        <>
            <div className='header-dashboard'>
                <span className="dashboard-title">Presentation Page</span>
                <span className='create-group-btn'>
                    <Button variant="primary" onClick={handleShow}>
                        Create Presentation
                    </Button>
                    <Button variant="primary" onClick={deletePresentation}>
                        Delete Presentation
                    </Button>
                </span>
            </div>
            <div className='table-member'>
                <Table striped bordered hover size="sm" >
                    <thead hidden={true}>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Edit</th>
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
        </>
    )
}

export default Presentation