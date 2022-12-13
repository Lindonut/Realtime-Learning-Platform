import React, { useState, useEffect } from 'react'
import '../../../App.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const Slide = () => {
    const orange = { background: 'orange' };
    const gray = { background: 'gray' };
    let { id } = useParams();
    const [slides, setSlide] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const lists = []
        lists.push({ id: 1, bg: orange, content: "This is Review1" });
        lists.push({ id: 2, bg: orange, content: "This is Review2" });
        lists.push({ id: 3, bg: orange, content: "This is Review3" });
        lists.push({ id: 4, bg: orange, content: "This is Review4" });
        lists.push({ id: 5, bg: orange, content: "This is Review5" });
        lists.push({ id: 6, bg: orange, content: "This is Review6" });
        lists.push({ id: 7, bg: orange, content: "This is Review7" });
        setSlide(lists)
    }, [])
    const changeQuestion = (e) => {
        slides[currentIndex].content = e.target.value;      
    }
    const reMarkId = () => {
        for (var i = 0;i < slides.length; i++) 
        {
            slides[i].id = i+1;
        }
    }
    const addSlide = () => {
        let number = slides.length +1;
        slides.push({ id: number, bg: orange, content: "This is Review" })
        navigate(`/presentation/${id}/edit`);
        
    }
    const deleteSlide = () => {
        alert("Do you want to delete slide " + (currentIndex + 1) + "?");
        slides.splice(currentIndex,1);
        reMarkId();
        navigate(`/presentation/${id}/edit`);
    }
    const arr = slides.map((slide, index) => {
        let classNameX = "slide-item";

        if (index === currentIndex)
            classNameX = classNameX + " " + "active"

        return (
            <div className={classNameX}
                onClick={() => setCurrentIndex(index)}
                key={slide.id}>
                <h4>{slide.id}</h4>
                <div className='slide-preview'>{slide.content}</div>
            </div>
        )
    })
    const arr2 = slides.map((slide, index) => {
        if (index === currentIndex) {
            return (
                <div className='slide-main' key={slide.id}>
                    <div className='slide-fullview'>{slide.content}</div>
                </div>
            )
        }
    })
    const arr3 = slides.map((slide, index) => {
        if (index === currentIndex) {
            return (
                <div className='slide-detail' key={slide.id}>
                    <div className='slide-fulldetail'>
                        <div>Slide Type</div>
                        <input placeholder='Multiselection' />
                        <div>Your Question</div>
                        <input placeholder={slides[currentIndex].content} onChange={(e) => changeQuestion(e)} />
                        <div>Your Options</div>
                        <input placeholder='Your Option 1' />
                        <input placeholder='Your Option 2' />
                        <input placeholder='Your Option 3' />
                        <input placeholder='Your Option 4' />                
                    </div>
                </div>
            )
        }
    })
    return (
        <>
            <div className='header-dashboard'>
                <span className="dashboard-title">Presentation: YOUR PRESENTATION NAME HERE</span>
                <span className='create-group-btn'>
                    <Button variant="primary" onClick={addSlide} >
                        Create Slide
                    </Button>
                    <Button variant="primary" onClick={deleteSlide} >
                        Delete Slide
                    </Button>
                </span>
            </div>
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