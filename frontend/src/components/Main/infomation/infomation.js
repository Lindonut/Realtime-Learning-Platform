import React, { useState, useEffect } from 'react'
import '../../../App.css'
import { useContext } from 'react'
import { authContext } from '../../../contexts/authContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
const Infomation = () => {
    const { authState: { isAuthenticated, user } } = useContext(authContext)
    let { id } = useParams();
    const [infomation, setInfomation] = useState([]);
    const getOnebyID = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/infomation/${id}`)
            .then(res => {
                setInfomation(res.data); 
                console.log(res.data);          
            }
            )
    }
    useEffect(() => {
        getOnebyID()
    }, []);
    return (
        <>
            <div className='table-member'>
                <h3>INFOMATION PAGE - {infomation.name}</h3>
                <Table striped bordered hover size="sm" >
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>{infomation.name}</th>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <th>{infomation.gender}</th>
                        </tr>
                        <tr>
                            <th>DOB</th>
                            <th>{infomation.dob}</th>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <th>{infomation.email}</th>
                        </tr>

                        <tr>
                            <th>Address</th>
                            <th>{infomation.address}</th>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <th>{infomation.phone}</th>
                        </tr>
                    </tbody>
                </Table>

            </div>
        </>
    )
}

export default Infomation