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
import {BsArrowLeftCircle, BsArrowRightCircle} from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify"
const SlideShowView = () => {
    let { id, idpp } = useParams();
    const [slides, setSlide] = useState([]);
    const [select, setSelect] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [chatquestion, setChatquestion] = useState("");
    const [chatlist, setChatlist] = useState([]);

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
    }
    const chatting = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const postChatquestion = () => {
        chatlist.push({ content: chatquestion });
        handleClose();
    }
    const changeResult = (e) => {
        const selectnumber = parseInt(select)
        var currentresult = slides[currentIndex].result;

        currentresult[selectnumber]++;
        console.log("done");
        axios.patch(`${process.env.REACT_APP_API_URL}/slide/${idpp}/${slides[currentIndex]._id}/update`, {
            result: currentresult
        })
            .then(res => {
                // navigate(`/presentation/${id}/${idpp}/slideshowview`);
                // getAllData()
                toast.success("Submitted.");
            }
            )
            .catch(err => console.log(err))
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
                        <div className='slideshowview-multiple-choice-option-full'>
                            <div className='slideshowview-multiple-choice-option-item'>
                                <input className='abc' type="radio" name="a" value="0" onClick={(e) => setSelect(e.target.value)} />
                                <label className='abcd'>
                                    {slide.choices[0]}
                                </label>
                            </div>
                            <div className='slideshowview-multiple-choice-option-item'>
                                <input className="abc" type="radio" name="a" value="1" onClick={(e) => setSelect(e.target.value)} />
                                <label className='abcd'>
                                    {slide.choices[1]}
                                </label>
                            </div>
                            <div className='slideshowview-multiple-choice-option-item'>
                                <input className="abc" type="radio" name="a" value="2" onClick={(e) => setSelect(e.target.value)} />
                                <label className='abcd'>
                                    {slide.choices[2]}
                                </label>
                            </div>
                            <div className='slideshowview-multiple-choice-option-item'>
                                <input className="abc" type="radio" name="a" value="3" onClick={(e) => setSelect(e.target.value)} />
                                <label className='abcd'>
                                    {slide.choices[3]}
                                </label>
                            </div>
                            <div className='slideshowview-multiple-choice-option-submit'>
                                <Button variant='primary' onClick={changeResult}>SUBMIT</Button>
                            </div>
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
    const arr2 = chatlist.map((chat) => {
        return (
            <div>
                <div>{chat.content}</div>
                <br></br>
            </div>
        )
    })
    return (
        <div className='slideshow-full'>

            <div className='slideshow-left'>
                <Button variant='light' onClick={changeCurrentIndexLeft}><BsArrowLeftCircle/></Button>
            </div>
            <div className='slideshow-center'>
                {arr1}
            </div>

            <div className='slideshow-right'>
                <Button className='slideshow-exit-btn' variant='light' onClick={exitSlideShow}>EXIT</Button>
                <Button className='slideshow-right-btn' variant='light' onClick={changeCurrentIndexRight}><BsArrowRightCircle/></Button>
                <Button className='slideshow-chat-btn' variant='light' onClick={chatting}>CHAT</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add A ChatBox/ Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>List question</label>
                    {arr2}
                    <label>Your question/Chat</label>
                    <input placeholder='Your question/Chat' onChange={(e) => setChatquestion(e.target.value)} />
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
export default SlideShowView