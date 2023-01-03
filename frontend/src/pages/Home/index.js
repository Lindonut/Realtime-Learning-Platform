import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Main from '../../components/Main/main'
import {Router, Navigate} from 'react-router-dom'
import {useContext} from 'react'
import '../../App.css'
import {authContext} from '../../contexts/authContext'
function Home() {
    const {authState: { isAuthenticated}} = useContext(authContext)

    if (!isAuthenticated) return <Navigate to='/login' />
    return (
        <div>
                <Header />
                <Main />

        </div>
    );
}

export default Home;