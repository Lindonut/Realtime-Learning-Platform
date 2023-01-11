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

const SlideShowView = () => {
    let { id, idpp } = useParams();
    const [slides, setSlide] = useState([]);
    const [select, setSelect] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

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
    const changeResult = (e) => {
        const selectnumber = parseInt(select)
        var currentresult = slides[currentIndex].result;

        currentresult[selectnumber]++;
        console.log("done");
        axios.patch(`${process.env.REACT_APP_API_URL}/slide/${idpp}/${slides[currentIndex]._id}/update`, {
            result: currentresult
        })
            .then(res => {
                navigate(`/presentation/${id}/${idpp}/slideshowview`);
                getAllData()
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
                                <label>
                                    <input type="radio" name="a" value="0" onClick={(e) => setSelect(e.target.value)} />
                                    {slide.choices[0]}
                                </label>
                            </div>
                            <div className='slideshowview-multiple-choice-option-item'>
                                <label>
                                    <input type="radio" name="a" value="1" onClick={(e) => setSelect(e.target.value)} />
                                    {slide.choices[1]}
                                </label>
                            </div>
                            <div className='slideshowview-multiple-choice-option-item'>
                                <label>
                                    <input type="radio" name="a" value="2" onClick={(e) => setSelect(e.target.value)} />
                                    {slide.choices[2]}
                                </label>
                            </div>
                            <div className='slideshowview-multiple-choice-option-item'>
                                <label>
                                    <input type="radio" name="a" value="3" onClick={(e) => setSelect(e.target.value)} />
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
            </div>
        </div>
    );
}
export default SlideShowView