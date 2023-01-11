import React, { useState, useEffect } from 'react'
import '../../../App.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'
import { toast } from "react-toastify";

const Slide = () => {
    const orange = { background: 'orange' };
    const gray = { background: 'gray' };
    let { id, idpp } = useParams();
    const [slides, setSlide] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const [presentationName, setPresentationName] = useState();
    const [url, setUrl] = useState();

    const getInfoPP = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/presentation/${idpp}`);
            setPresentationName(res.data.name);
            setUrl(res.data.url);
        } catch (error) {
            console.log(error);
        }
    }
    const getAllData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/slide/${idpp}`)
            .then(res => {
                setSlide(res.data)
            }
            )
            .catch(err => console.log(err))
    }
    const changeQuestion = (e) => {
        axios.patch(`${process.env.REACT_APP_API_URL}/slide/${idpp}/${slides[currentIndex]._id}/update`, {
            heading: e.target.value
        })
            .then(res => {
                navigate(`/presentation/${id}/${idpp}/edit`);
                getAllData()
            }
            )
            .catch(err => console.log(err))

    }
    const changeType = (e) => {
        axios.patch(`${process.env.REACT_APP_API_URL}/slide/${idpp}/${slides[currentIndex]._id}/update`, {
            type: e.target.value
        })
            .then(res => {
                navigate(`/presentation/${id}/${idpp}/edit`);
                getAllData()
            }
            )
            .catch(err => console.log(err))
    }
    const changeOption1 = (e) => {
        var choiceschange = slides[currentIndex].choices;
        choiceschange[0] = e.target.value;
        axios.patch(`${process.env.REACT_APP_API_URL}/slide/${idpp}/${slides[currentIndex]._id}/update`, {
            choices: choiceschange
        })
            .then(res => {
                navigate(`/presentation/${id}/${idpp}/edit`);
                getAllData()
            }
            )
            .catch(err => console.log(err))
    }
    const changeOption2 = (e) => {
        var choiceschange = slides[currentIndex].choices;
        choiceschange[1] = e.target.value;
        axios.patch(`${process.env.REACT_APP_API_URL}/slide/${idpp}/${slides[currentIndex]._id}/update`, {
            choices: choiceschange
        })
            .then(res => {
                navigate(`/presentation/${id}/${idpp}/edit`);
                getAllData()
            }
            )
            .catch(err => console.log(err))
    }
    const changeOption3 = (e) => {
        var choiceschange = slides[currentIndex].choices;
        choiceschange[2] = e.target.value;
        axios.patch(`${process.env.REACT_APP_API_URL}/slide/${idpp}/${slides[currentIndex]._id}/update`, {
            choices: choiceschange
        })
            .then(res => {
                navigate(`/presentation/${id}/${idpp}/edit`);
                getAllData()
            }
            )
            .catch(err => console.log(err))
    }
    const changeOption4 = (e) => {
        var choiceschange = slides[currentIndex].choices;
        choiceschange[3] = e.target.value;
        axios.patch(`${process.env.REACT_APP_API_URL}/slide/${idpp}/${slides[currentIndex]._id}/update`, {
            choices: choiceschange
        })
            .then(res => {
                navigate(`/presentation/${id}/${idpp}/edit`);
                getAllData()
            }
            )
            .catch(err => console.log(err))
    }
    const changeParagraph = (e) => {
        axios.patch(`${process.env.REACT_APP_API_URL}/slide/${idpp}/${slides[currentIndex]._id}/update`, {
            paragraph: e.target.value
        })
            .then(res => {
                navigate(`/presentation/${id}/${idpp}/edit`);
                getAllData()
            }
            )
            .catch(err => console.log(err))
    }
    const addSlide = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/slide/${idpp}/add`)
            .then((res) => {
                navigate(`/presentation/${id}/${idpp}/edit`);
                getAllData()
            })
    }
    const deleteSlide = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/slide/${idpp}/${slides[currentIndex]._id}/delete`)
            .then(res => {
                navigate(`/presentation/${id}/${idpp}/edit`);
                getAllData()
            }
            )
            .catch(err => console.log(err))
        navigate(`/presentation/${id}/${idpp}/edit`);
    }
    const slideShow = () => {
        navigate(`/presentation/${id}/${idpp}/slideshow`);
    }
    const handleShare = () => {
        navigator?.clipboard?.writeText(url);
          toast.success('Copied to clipboard.');
    };

    useEffect(() => {
        getAllData();
        getInfoPP();
    }, []);
    
    const arr = slides.map((slide, index) => {
        let classNameX = "slide-item";

        if (index === currentIndex)
            classNameX = classNameX + " " + "active"
        if (slide.type == "Multiple Choice") {
            return (
                <div className={classNameX}
                    onClick={() => setCurrentIndex(index)}
                    key={slide._id}>
                    <h4>{index + 1}</h4>
                    <div className='slide-preview'>
                        <div className='slide-multiple-choice-question'>
                            <div>{slide.heading}</div>
                        </div>
                        <div className='slide-multiple-choice-option'>
                            <div className='slide-multiple-choice-option-item'>{slide.choices[0]}</div>
                            <div className='slide-multiple-choice-option-item'>{slide.choices[1]}</div>
                            <div className='slide-multiple-choice-option-item'>{slide.choices[2]}</div>
                            <div className='slide-multiple-choice-option-item'>{slide.choices[3]}</div>
                        </div>

                    </div>
                </div>
            )
        }
        else if (slide.type == "Heading") {
            return (
                <div className={classNameX}
                    onClick={() => setCurrentIndex(index)}
                    key={slide.id}>
                    <h4>{index + 1}</h4>
                    <div className='slide-preview'>
                        <div className='slide-heading-heading'>
                            <d>{slide.heading}</d>
                        </div>
                        <div className='slide-heading-subheading'>
                            <div>{slide.paragraph}</div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={classNameX}
                    onClick={() => setCurrentIndex(index)}
                    key={slide.id}>
                    <h4>{index + 1}</h4>
                    <div className='slide-preview'>
                        <div className='slide-heading-heading'>
                            <div>{slide.heading}</div>
                        </div>
                        <div className='slide-heading-subheading'>
                            <div>{slide.paragraph}</div>
                        </div>
                    </div>
                </div>
            )
        }
    })
    const arr2 = slides.map((slide, index) => {
        if (index === currentIndex) {
            if (slides[currentIndex].type == "Multiple Choice") {
                return (
                    <div className='slide-main' key={slide.id}>
                        <div className='slide-fullview'>
                            <div className='slide-multiple-choice-question-full'>
                                <h1>{slide.heading}</h1>
                            </div>
                            <div className='slide-multiple-choice-option-full'>
                                <div className='slide-multiple-choice-option-item-full'>{slide.choices[0]}</div>
                                <div className='slide-multiple-choice-option-item-full'>{slide.choices[1]}</div>
                                <div className='slide-multiple-choice-option-item-full'>{slide.choices[2]}</div>
                                <div className='slide-multiple-choice-option-item-full'>{slide.choices[3]}</div>
                            </div>
                        </div>
                    </div>
                )
            }
            else if (slides[currentIndex].type == "Heading") {
                return (
                    <div className='slide-main' key={slide.id}>
                        <div className='slide-fullview'>
                            <div className='slide-heading-heading-full'>
                                <h1>{slide.heading}</h1>
                            </div>
                            <div className='slide-heading-subheading-full'>
                                <h3>{slide.paragraph}</h3>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className='slide-main' key={slide.id}>
                        <div className='slide-fullview'>
                            <div className='slide-paragraph-heading-full'>
                                <h1>{slide.heading}</h1>
                            </div>
                            <div className='slide-paragraph-paragraph-full'>
                                <p>{slide.paragraph}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    })
    const arr3 = slides.map((slide, index) => {
        if (index === currentIndex) {
            if (slides[currentIndex].type == "Multiple Choice") {
                return (
                    <div className='slide-detail' key={slide.id}>
                        <div className='slide-fulldetail'>
                            <div>Slide Type</div>
                            <select className='select' value={slides[currentIndex].type} onChange={(e) => changeType(e)}>
                                <option>Multiple Choice</option>
                                <option>Heading</option>
                                <option>Paragraph</option>
                            </select>
                            <div>Your Question</div>
                            <input placeholder={slides[currentIndex].heading} onChange={(e) => changeQuestion(e)} />
                            <div>Your Options</div>
                            <input placeholder={slides[currentIndex].choices[0]} onChange={(e) => changeOption1(e)} />
                            <input placeholder={slides[currentIndex].choices[1]} onChange={(e) => changeOption2(e)} />
                            <input placeholder={slides[currentIndex].choices[2]} onChange={(e) => changeOption3(e)} />
                            <input placeholder={slides[currentIndex].choices[3]} onChange={(e) => changeOption4(e)} />
                        </div>
                    </div>
                )
            }
            else if (slides[currentIndex].type == "Heading") {
                return (
                    <div className='slide-detail' key={slide.id}>
                        <div className='slide-fulldetail'>
                            <div>Slide Type</div>
                            <select className='select' value={slides[currentIndex].type} onChange={(e) => changeType(e)}>
                                <option>Multiple Choice</option>
                                <option>Heading</option>
                                <option>Paragraph</option>
                            </select>
                            <div>Your Heading</div>
                            <input placeholder={slides[currentIndex].heading} onChange={(e) => changeQuestion(e)} />
                            <div>Your Sub Heading</div>
                            <input className='long-text' placeholder={slides[currentIndex].paragraph} onChange={(e) => changeParagraph(e)} />
                        </div>
                    </div>
                )

            }
            else {
                return (
                    <div className='slide-detail' key={slide.id}>
                        <div className='slide-fulldetail'>
                            <div>Slide Type</div>
                            <select className='select' value={slides[currentIndex].type} onChange={(e) => changeType(e)}>
                                <option>Multiple Choice</option>
                                <option>Heading</option>
                                <option>Paragraph</option>
                            </select>
                            <div>Your Heading</div>
                            <input placeholder={slides[currentIndex].heading} onChange={(e) => changeQuestion(e)} />
                            <div>Your Paragraph</div>
                            <input className='long-text' placeholder={slides[currentIndex].paragraph} onChange={(e) => changeParagraph(e)} />
                        </div>
                    </div>
                )
            }
        }
    })
    const name = presentationName;
    console.log(name);
    return (
        <>
            <Navbar bg="light" variant="light" className='header-dashboard'>
                <span className="pp-name"> {name}</span>
                <Navbar.Collapse className="justify-content-end border-info">
                    <span className='edit-slide-btn'>
                        <Button variant="primary" onClick={addSlide} >
                            Add New Slide
                        </Button>
                    </span>
                    <span className='edit-slide-btn'>
                        <Button variant="btn btn-danger" onClick={deleteSlide} >
                            Delete Slide
                        </Button>
                    </span>
                    <span className='edit-slide-btn'>
                        <Button variant="primary" onClick={slideShow} >
                            Slideshow
                        </Button>
                    </span>
                    <span className='edit-slide-btn'>
                        <Button variant="primary" onClick={handleShare} >
                            Share
                        </Button>
                    </span>
                </Navbar.Collapse>
            </Navbar>
            <div className='main-editing-slide'>
                <div className='slide-list'>
                    {arr}
                </div>
                {arr2}
                {arr3}
            </div>
        </>
    )
}
export default Slide;