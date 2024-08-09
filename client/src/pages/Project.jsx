import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navBar";
import { Link } from "react-router-dom";

function Project() {
  const [projectId, setProjectId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleProjectLogin = async () => {
    const username = localStorage.getItem("username"); // Retrieve the username from localStorage

    if (!projectId) {
      alert("Please enter a Project ID.");
      return;
    }

    if (!username) {
      alert("No user found. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      // API call to check if the project exists and to get project details
      const response = await axios.post(
        "http://localhost:5000/get_project_info",
        { project_id: projectId }
      );
      if (response.data.success) {
        // If project exists, navigate to hardware page with project details
        navigate("/hardware", {
          state: { project: response.data.project, username },
        });
      } else {
        setMessage("Project ID not found.");
      }
    } catch (error) {
      console.error("Error fetching project info:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="homeTop">
        <Link to={"/"}>
          <button className="routerButton">Home</button>
        </Link>
      </div>
      <p className="otherParagraph">
        Give a <i>Project ID</i> to join a project and request Hardware
      </p>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <div style={{ marginTop: "0px" }}>
          <div className="formGroup">
            <label htmlFor="projectid" className="labelSignUp">
              Project ID:{" "}
            </label>
            <input
              type="text"
              className="textBox"
              id="projectid"
              placeholder="Enter Project ID"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)} // Update the state with the entered Project ID
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleProjectLogin} // Handle the Project Login button click
              className="ButtonSign buttonPlace"
            >
              Project Login
            </button>
          </div>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Project;
