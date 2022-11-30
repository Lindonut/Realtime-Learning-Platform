import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register'
import Login from './pages/Login/index'
import Home from './pages/Home'
import Verify from './pages/Verify/verify'
import VerifySuccess from './pages/Verify/verifySuccess'
import AuthContextProvider from './contexts/authContext'
import Infomation from './components/Main/infomation/infomation'
import Dashboard from './components/Main/dashboard/dashboard'
import Infogroup from './components/Main/infogroup/infogroup'
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
        autoClose= {5000}
        />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/infomation/:id" element={<Infomation />} />
            <Route path="/infogroup/:groupID" element={<Infogroup/>}>
              <Route path="/infogroup/:groupID" element={<Description />} />
              <Route path="/infogroup/:groupID/member" element={<Member />} />
            </Route>
          </Route>
          <Route path='/verify' element={<Verify />} />
          <Route path='/verify/:token' element={<VerifySuccess />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}


export default App;