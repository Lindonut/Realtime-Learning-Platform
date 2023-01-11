import React from 'react'
import { useParams } from 'react-router-dom'
import '../../../App.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Chart from "react-apexcharts";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
const SlideShow = () => {
    let { id, idpp } = useParams();
    const [slides, setSlide] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [show, setShow] = useState(false);
    const [chatquestion, setChatquestion] = useState();
    const [chatlist, setChatlist] = useState([]);
    const navigate = useNavigate();
    // useEffect(() => {
    //     const lists = []
    //     lists.push({
    //         id: 1, type: "Multiple Choice", heading: "This is Review1", paragraph: "",
    //         choice: [1, 2, 3, 4], layout: "Bars", image: "", result: [10, 20, 30, 40]
    //     });
    //     lists.push({
    //         id: 2, type: "Heading", heading: "This is Review2", paragraph: "Hello2",
    //         choice: [], layout: "Bars", image: "", result: []
    //     });
    //     lists.push({
    //         id: 3, type: "Paragraph", heading: "This is Review3", paragraph: "World3",
    //         choice: [], layout: "Bars", image: "", result: []
    //     });
    //     lists.push({
    //         id: 4, type: "Multiple Choice", heading: "This is Review4", paragraph: "",
    //         choice: [7, 8, 9, 10], layout: "Bars", image: "", result: [50, 60, 70, 80]
    //     });
    //     lists.push({
    //         id: 5, type: "Heading", heading: "This is Review5", paragraph: "Hello5",
    //         choice: [], layout: "Bars", image: "", result: []
    //     });
    //     lists.push({
    //         id: 6, type: "Paragraph", heading: "This is Review6", paragraph: "World6",
    //         choice: [], layout: "Bars", image: "", result: []
    //     });
    //     setSlide(lists)
    // }, [])
    useEffect(() => {
        const lists = []
        lists.push({
            content: "Question 1:"
        });
        lists.push({
            content: "Question 2:"
        });
        lists.push({
            content: "Question 3:"
        });
        lists.push({
            content: "Question 4:"
        });
        lists.push({
            content: "Question 5:"
        });
        lists.push({
            content: "Question 6:"
        });
        setChatlist(lists)
    }, [])

    const getAllData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/slide/${idpp}`)
            .then(res => {
                setSlide(res.data)
            }
            )
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getAllData()
    }, []);

    const exitSlideShow = () => {
        navigate(`/presentation/${id}`);
    }
    const changeCurrentIndexLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            if (slides[currentIndex - 1].type == "Multiple Choice") {
                state.options.xaxis.categories = slides[currentIndex - 1].choices;
                state.series[0].data = slides[currentIndex - 1].result;
            }
        }
        else {
            setCurrentIndex(0)
        }
        showindex();
    }
    const changeCurrentIndexRight = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1)
            if (slides[currentIndex + 1].type == "Multiple Choice") {
                state.options.xaxis.categories = slides[currentIndex + 1].choices;
                state.series[0].data = slides[currentIndex + 1].result;
            }
        }
        else {
            setCurrentIndex(slides.length - 1)
        }
        showindex();
    }
    const showindex = () => {
        console.log("Current now: " + currentIndex);
    }
    const chatting = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const postChatquestion = () => {
        chatlist.splice(chatquestion, 1);
        handleClose();
    }
    const [state, setState] = useState({
        options: {
            colors: ["#E91E63"],
            chart: {
                id: "basic-bar",
            },
            xaxis: {
                categories: [0, 0, 0, 0],
            },
        },
        series: [
            {
                name: "People Born",
                data: [0, 0, 0, 0],
            },
        ],
    });
    const arr1 = slides.map((slide, index) => {
        if (index === currentIndex) {
            if (slides[currentIndex].type == "Multiple Choice") {
                return (
                    <div className='slideshow-fullview' key={slide.id}>
                        <div className='slideshow-multiple-choice-question-full'>
                            <div>{slide.heading}</div>
                        </div>
                        <div className='slideshow-multiple-choice-option-full'>
                            <Chart
                                options={state.options}
                                series={state.series}
                                type="bar"
                                width="100%"
                                height="100%"
                            />
                        </div>

                    </div>
                )
            }
            else if (slides[currentIndex].type == "Heading") {
                return (
                    <div className='slide-fullview' key={slide.id} >
                        <div className='slide-heading-heading-full'>
                            <div>{slide.heading}</div>
                        </div>
                        <div className='slide-heading-subheading-full'>
                            <div>{slide.paragraph}</div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className='slide-fullview' key={slide.id}>
                        <div className='slide-paragraph-heading-full'>
                            <div>{slide.heading}</div>
                        </div>
                        <div className='slide-paragraph-paragraph-full'>
                            <div>{slide.paragraph}</div>
                        </div>
                    </div>
                )
            }
        }
    })
    const arr2 = chatlist.map((chat, index) => {
        return (
            <div>
                <span>{chat.content}</span>
            </div>
        )
    })
    return (
        <div className='slideshow-full'>
            <div className='slideshow-left'>
                <Button className='slideshow-left-btn' variant='primary' onClick={changeCurrentIndexLeft}>LEFT</Button>
            </div>

            <div className='slideshow-center'>
                {arr1}
            </div>

            <div className='slideshow-right'>
                <Button className='slideshow-exit-btn' variant='primary' onClick={exitSlideShow}>EXIT</Button>
                <Button className='slideshow-right-btn' variant='primary' onClick={changeCurrentIndexRight}>RIGHT</Button>
                <Button className='slideshow-chat-btn' variant='primary' onClick={chatting}>CHAT</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>List Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>List question</label>
                    {arr2}
                    <label>Your question you want to mark</label>
                    <input placeholder='Input index here' onChange={(e) => setChatquestion(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={postChatquestion}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default SlideShow