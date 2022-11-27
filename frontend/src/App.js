import logo from './logo.svg';
import './App.css';
import Footer from './Components/Footer/footer';
import Header from './Components/Header/header';
import Main from './Components/Main/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Verify from './pages/Verify'
function App() {
  return (
    <div className="App">
      <Router>
        <div className='App'>
          <Header />
          <Main />
          <Footer />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/verify' element={<Verify />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}


export default App;
