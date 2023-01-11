import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register'
import Login from './pages/Login/index'
import Home from './pages/Home'
import Verify from './pages/Verify/verify'
import RecoverMail from './pages/ForgotPassword/entermail'
import NewPassword from './pages/ForgotPassword/enternewpassword'
import VerifySuccess from './pages/Verify/verifySuccess'
import Presentation from './components/Main/presentation/presentation';
import Slide from './components/Main/slide/slide';
import Collab from './components/Main/presentation/collab';
import ConfirmCollab from './components/Main/presentation/confirmcollab';
import Dashboard from './components/Main/dashboard/dashboard'
import Infogroup from './components/Main/infogroup/infogroup'
import Description from './components/Main/infogroup/description/description'
import Member from './components/Main/infogroup/member/member'
import ConfirmJoinGroup from './pages/InvitationGroup/confirmjoingroup'
import io from 'socket.io-client';
import { useEffect, useContext } from 'react';
import { authContext } from '../src/contexts/authContext';
import SlideShow from './components/Main/slideshow/slideshow';
import Spinner from 'react-bootstrap/Spinner'
import SlideShowView from './components/Main/slideshow/slideshowview';
import GuestSlideshow from './pages/Guest/joinslideshow';

function App() {
  const { authState: { authLoading, isAuthenticated, user } } = useContext(authContext)
  console.log("isAuthenticated", isAuthenticated);
  if(authLoading) {
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
    </div>
    )
  }
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
              <Route path="/presentation/:id" element={<Presentation />} />
              <Route path="/presentation/:id/:idpp/edit" element={<Slide />} />
                <Route path="/infogroup/:groupID" element={<Infogroup />}>
                  <Route path="/infogroup/:groupID" element={<Description />} />
                  <Route path="/infogroup/:groupID/member" element={<Member />} />
                </Route>
              <Route path="/presentation/:id/:idpp/slideshow" element={<SlideShow />} />
              <Route path="/:groupID/invitation/:token" element={<ConfirmJoinGroup />} />
              <Route path="/presentation/:id/:idpp/slideshow/:code" element={<SlideShowView />} />
              <Route path="/presentation/:idpp/collab" element={<Collab />} />
              <Route path="/presentation/:idpp/collaboration/:token" element={<ConfirmCollab />} />
              
            </Route>
            <Route path="*" element={<Navigate to='/' />} />
          </>
        ) : (
          <>
            <Route path='/register' element={<Register />} />
            <Route path='/verify/:userID' element={<Verify />} />
            <Route path='/verifyCompleted/:token' element={<VerifySuccess />} />
            <Route path='/login' element={<Login />} />
            <Route path='/fogotPassword' element={<RecoverMail />} />
            <Route path='/resetPassword/:token' element={<NewPassword />} />
            <Route path="/presentation/:id/:idpp/slideshow/:code" element={<GuestSlideshow />} />
            <Route path="*" element={<Navigate to='/login' />} />
          </>
        )}
      </Routes>
    </Router>
  );
}


export default App;