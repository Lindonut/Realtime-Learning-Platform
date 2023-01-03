import React from 'react'
import { useParams } from 'react-router-dom'
import '../../../../App.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Description = () => {
    let {groupID} = useParams();
    const [group, setGroup] = useState([]);
    useEffect(() => {
        getAllData()

    }, []);

    const getAllData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/group/${groupID}`)
            .then(res => {
                setGroup(res.data.group)
            }
            )
            .catch(err => console.log(err))
    }
    return (
        
        <>
            <span className="description"> Description Page</span>
            <div className="description"> {group.description}</div>
        </>
    )
}

export default Description