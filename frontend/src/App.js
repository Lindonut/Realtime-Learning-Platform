import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register'
import Login from './pages/Login/index'
import Home from './pages/Home'
import Verify from './pages/Verify/verify'
import VerifySuccess from './pages/Verify/verifySuccess'
import Infomation from './components/Main/infomation/infomation'
import Presentation from './components/Main/presentation/presentation';
import Slide from './components/Main/slide/slide';
import Dashboard from './components/Main/dashboard/dashboard'
import Infogroup from './components/Main/infogroup/infogroup'
import ConfirmJoin from './components/Main/infogroup/confirmjoin'
import Description from './components/Main/infogroup/description/description'
import Member from './components/Main/infogroup/member/member'
import io from 'socket.io-client';
import { useEffect, useContext } from 'react';
import { authContext } from '../src/contexts/authContext';
import MyChart from './components/Main/chart/chart';

function App() {
  const { authState: { isAuthenticated, user } } = useContext(authContext)
  console.log("isAuthenticated", isAuthenticated);
  return (
    <Router>
      <ToastContainer
        draggable="false"
        position="top-right"
        pauseOnHover="false"
        autoClose={3000}
      />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path='/' element={<Home />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/infomation/:id" element={<Infomation />} />
              <Route path="/presentation/:id" element={<Presentation />} />
              <Route path="/presentation/:id/:idpp/edit" element={<Slide />} />
              <Route path="/infogroup/invitation/:groupID/:code" element={<ConfirmJoin />} />
              <Route path="/infogroup/:groupID" element={<Infogroup />}>
                <Route path="/infogroup/:groupID" element={<Description />} />
                <Route path="/infogroup/:groupID/member" element={<Member />} />
              </Route>
              <Route path="/presentation/:id/:idpp/chart" element={<MyChart />} />
              
            </Route>
            <Route path="*" element={<Navigate to='/' />} />
          </>
        ) : (
          <>
            <Route path='/register' element={<Register />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/verify/:token' element={<VerifySuccess />} />
            <Route path='/login' element={<Login />} />
            <Route path="*" element={<Navigate to='/login' />} />
          </>
        )}
      </Routes>
    </Router>
  );
}


export default App;