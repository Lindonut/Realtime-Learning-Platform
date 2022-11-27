import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Verify from './pages/Verify'
import AuthContextProvider from './contexts/authContext'

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}


export default App;
