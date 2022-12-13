import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import {  ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register'
import Login from './pages/Login/index'
import Home from './pages/Home'
import Verify from './pages/Verify/verify'
import VerifySuccess from './pages/Verify/verifySuccess'
import AuthContextProvider from './contexts/authContext'
import Infomation from './components/Main/infomation/infomation'
import Presentation from './components/Main/presentation/presentation';
import Slide from './components/Main/slide/slide';
import Dashboard from './components/Main/dashboard/dashboard'
import Infogroup from './components/Main/infogroup/infogroup'
import JoinedGroup from './components/Main/infogroup/joinedgroup'
import Description from './components/Main/infogroup/description/description'
import Member from './components/Main/infogroup/member/member'

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <ToastContainer
          draggable="false"
          position="top-right"
          pauseOnHover="false"
          autoClose={5000}
        />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/infomation/:id" element={<Infomation />} />
            <Route path="/presentation/:id" element={<Presentation />} />
            <Route path="/presentation/:id/edit" element={<Slide />} />
            <Route path="/infogroup/:groupID" element={<Infogroup />}>
              <Route path="/infogroup/:groupID" element={<Description />} />
              <Route path="/infogroup/:groupID/member" element={<Member />} />
            </Route>
          </Route>
          <Route path='/verify' element={<Verify />} />
          <Route path='/verify/:token' element={<VerifySuccess />} />
          <Route path='/infogroup/invitation/:id/:code' element={<JoinedGroup />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}


export default App;