import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signUp";
import Login from "./pages/login";
import Project from "./pages/Project";
import NewProject from "./pages/newProject";
import Hardware from "./pages/hardware";
import ProjectsList from "./pages/projectList";
import { UserProvider } from "./pages/UserContext";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newProject" element={<Project />} />
          <Route path="/project" element={<NewProject />} />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/projectList" element={<ProjectsList />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
