import React from 'react'
import '../../../App.css'
import { Routes, Route, Outlet, Link, useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Description from './description/description'
import Member from './member/member'
import Dashboard from '../dashboard/dashboard'
import Infomation from '../infomation/infomation'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Infogroup = () => {
    let { groupID } = useParams();
    const [group, setGroup] = useState([]);
    useEffect(() => {
        getAllData()

    }, []);

    const getAllData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/group/${groupID}`)
            .then(res => {
                setGroup(res.data)
                console.log(res.data)
            }
            )
            .catch(err => console.log(err))
    }
    return (
        <>
            <Navbar bg="light" variant="light">
                <span className='infogroup-name'>{group.name}</span>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end border-info">
                    <Link to={`/infogroup/${groupID}`} className='infogroup-tool'>Description</Link>
                    <Link to={`/infogroup/${groupID}/member`} className='infogroup-tool'>Member</Link>
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
        </>
    )
}

export default Infogroup