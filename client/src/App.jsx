import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/signUp';
import Login from './pages/login';
import Project from './pages/project';
import NewProject from './pages/newProject';
import Hardware from './pages/hardware';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newProject" element={<Project />} />
        <Route path="/project" element={<NewProject />} />
        <Route path="/hardware" element={<Hardware />} />
      </Routes>
    </div>
  );
};

export default App;

