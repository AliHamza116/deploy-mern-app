import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import './App.css';
import { useState } from 'react';
import RefrshHandler from './pages/RefrshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to ="/login" />
  }
  return (
    <div className="App">
        <RefrshHandler setisAuthenticated={ setIsAuthenticated }/>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />
      </Routes>
    </div>
  );
}

export default App;
