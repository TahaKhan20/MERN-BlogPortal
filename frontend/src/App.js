import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/home';
import Create from './Components/create';
import Edit from './Components/edit';
import Login from './Login/login';
import SignUp from './Login/signup';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
