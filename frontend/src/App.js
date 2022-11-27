import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Verify from './pages/Verify'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/verify' element={<Verify/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
