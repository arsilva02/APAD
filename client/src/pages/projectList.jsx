import React, { useState, useEffect } from "react";
import Navbar from "./navBar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); // Get the username from localStorage

  useEffect(() => {
    console.log("Fetching projects for user:", username); // Debugging log
    const fetchProjects = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/get_user_projects_list",
          { username }
        );
        setProjects(response.data.projects);
      } catch (error) {
        console.error("There was an error!", error);
        setMessage("Failed to load projects. Please try again.");
      }
    };

    fetchProjects();
  }, [username]);

  const handleSelectProject = (project) => {
    navigate("/hardware", { state: { project } });
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h2>Welcome, {username}</h2>
          <p>Here are your current projects:</p>
          <div className="dashboard-actions">
            <Link to={"/project"}>
              <button className="ProjectButton">Create New Project</button>
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
            <Link to={"/newProject"}>
              <button className="ProjectButton">Login with Project ID</button>
            </Link>
          </div>
        </div>
        {message && <p className="error-message">{message}</p>}
      </div>
    </>
  );
};

export default ProjectsList;
