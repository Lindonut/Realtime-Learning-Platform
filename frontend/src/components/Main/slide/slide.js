import React, { useState, useEffect } from 'react'
import '../../../App.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';

const Slide = () => {
    const orange = { background: 'orange' };
    const gray = { background: 'gray' };
    let { id, idpp } = useParams();
    const [slides, setSlide] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const lists = []
        lists.push({
            id: 1, type: "Multiple Choice", heading: "This is Review1", paragraph: "",
            choice: [1, 2, 3, 4], layout: "Bars", image: ""
        });
        lists.push({
            id: 2, type: "Heading", heading: "This is Review2", paragraph: "Hello2",
            choice: [], layout: "Bars", image: ""
        });
        lists.push({
            id: 3, type: "Paragraph", heading: "This is Review3", paragraph: "World3",
            choice: [], layout: "Bars", image: ""
        });
        lists.push({
            id: 4, type: "Multiple Choice", heading: "This is Review4", paragraph: "",
            choice: [7, 8, 9, 10], layout: "Bars", image: ""
        });
        lists.push({
            id: 5, type: "Heading", heading: "This is Review5", paragraph: "Hello5",
            choice: [], layout: "Bars", image: ""
        });
        lists.push({
            id: 6, type: "Paragraph", heading: "This is Review6", paragraph: "World6",
            choice: [], layout: "Bars", image: ""
        });
        setSlide(lists)
    }, [])
    const changeQuestion = (e) => {
        slides[currentIndex].heading = e.target.value; navigate(`/presentation/${id}/${idpp}/edit`);
    }
    const changeType = (e) => {
        slides[currentIndex].type = e.target.value; navigate(`/presentation/${id}/${idpp}/edit`);
    }
    const changeOption1 = (e) => {
        slides[currentIndex].choice[0] = e.target.value; navigate(`/presentation/${id}/${idpp}/edit`);
    }
    const changeOption2 = (e) => {
        slides[currentIndex].choice[1] = e.target.value; navigate(`/presentation/${id}/${idpp}/edit`);
    }
    const changeOption3 = (e) => {
        slides[currentIndex].choice[2] = e.target.value; navigate(`/presentation/${id}/${idpp}/edit`);
    }
    const changeOption4 = (e) => {
        slides[currentIndex].choice[3] = e.target.value; navigate(`/presentation/${id}/${idpp}/edit`);
    }
    const changeParagraph = (e) => {
        slides[currentIndex].paragraph = e.target.value; navigate(`/presentation/${id}/${idpp}/edit`);
    }
    const reMarkId = () => {
        for (var i = 0; i < slides.length; i++) {
            slides[i].id = i + 1;
        }
    }
    const addSlide = () => {
        let number = slides.length + 1;
        slides.push({
            id: number, type: "Multiple Choice", heading: "This is Review1", paragraph: "",
            choice: [0, 0, 0, 0], layout: "Bars", image: ""
        })
        navigate(`/presentation/${id}/${idpp}/edit`);

    }
    const deleteSlide = () => {
        alert("Do you want to delete slide " + (currentIndex + 1) + "?");
        slides.splice(currentIndex, 1);
        reMarkId();
        if (currentIndex == 0) {
            setCurrentIndex(0)
        }
        else {
            setCurrentIndex(currentIndex - 1);
        }
        navigate(`/presentation/${id}/${idpp}/edit`);
    }
    const slideShow = () => {
        navigate(`/presentation/${id}/${idpp}/slideshow`);
    }
    const arr = slides.map((slide, index) => {
        let classNameX = "slide-item";

        if (index === currentIndex)
            classNameX = classNameX + " " + "active"
        if (slide.type == "Multiple Choice") {
            return (
                <div className={classNameX}
                    onClick={() => setCurrentIndex(index)}
                    key={slide.id}>
                    <h4>{slide.id}</h4>
                    <div className='slide-preview'>
                        <div className='slide-multiple-choice-question'>
                            <div>{slide.heading}</div>
                        </div>
                        <div className='slide-multiple-choice-option'>
                            <div className='slide-multiple-choice-option-item'>{slide.choice[0]}</div>
                            <div className='slide-multiple-choice-option-item'>{slide.choice[1]}</div>
                            <div className='slide-multiple-choice-option-item'>{slide.choice[2]}</div>
                            <div className='slide-multiple-choice-option-item'>{slide.choice[3]}</div>
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
                    <h4>{slide.id}</h4>
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
        else {
            return (
                <div className={classNameX}
                    onClick={() => setCurrentIndex(index)}
                    key={slide.id}>
                    <h4>{slide.id}</h4>
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
                                <div>{slide.heading}</div>
                            </div>
                            <div className='slide-multiple-choice-option-full'>
                                <div className='slide-multiple-choice-option-item-full'>{slide.choice[0]}</div>
                                <div className='slide-multiple-choice-option-item-full'>{slide.choice[1]}</div>
                                <div className='slide-multiple-choice-option-item-full'>{slide.choice[2]}</div>
                                <div className='slide-multiple-choice-option-item-full'>{slide.choice[3]}</div>
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
                                <div>{slide.heading}</div>
                            </div>
                            <div className='slide-heading-subheading-full'>
                                <div>{slide.paragraph}</div>
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
                                <div>{slide.heading}</div>
                            </div>
                            <div className='slide-paragraph-paragraph-full'>
                                <div>{slide.paragraph}</div>
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
                            <input placeholder={slides[currentIndex].choice[0]} onChange={(e) => changeOption1(e)} />
                            <input placeholder={slides[currentIndex].choice[1]} onChange={(e) => changeOption2(e)} />
                            <input placeholder={slides[currentIndex].choice[2]} onChange={(e) => changeOption3(e)} />
                            <input placeholder={slides[currentIndex].choice[3]} onChange={(e) => changeOption4(e)} />
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
    return (
        <>
            <Navbar bg="light" variant="light" className='header-dashboard'>
                <span className="dashboard-title">Presentation: {idpp}</span>
                <Navbar.Collapse className="justify-content-end border-info">
                    <span className='edit-slide-btn'>
                        <Button variant="primary" onClick={addSlide} >
                            Create
                        </Button>
                    </span>
                    <span className='edit-slide-btn'>
                        <Button variant="primary" onClick={deleteSlide} >
                            Delete
                        </Button>
                    </span>
                    <span className='edit-slide-btn'>
                        <Button variant="primary" onClick={slideShow} >
                            Show
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