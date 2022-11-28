import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Main from '../../components/Main/main'
import {Router} from 'react-router-dom'
import '../../App.css'
function Home() {
    return (
        <div>
                <Header />
                <Main />
                <Footer />

        </div>
    );
}

export default Home;