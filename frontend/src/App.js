import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Verify from './pages/Verify'
import AuthContextProvider from './contexts/authContext'
import Infomation from './components/Main/infomation/infomation'
import Dashboard from './components/Main/dashboard/dashboard'
import Infogroup from './components/Main/inforgroup/infogroup'
import Description from './components/Main/inforgroup/description/description'
import Member from './components/Main/inforgroup/member/member'
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/infomation" element={<Infomation />} />
            <Route path="/infogroup" element={<Infogroup />}>
              <Route path="/infogroup" element={<Description />} />
              <Route path="/infogroup/member" element={<Member />} />
            </Route>
          </Route>
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}


export default App;