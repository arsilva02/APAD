import React, { useState } from "react";
import Navbar from "./navBar";
import { Link } from "react-router-dom";
import axios from "axios";

const NewProject = () => {
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/create_project', {
        project_name: name,
        project_id: projectId,
        description: description
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        console.error('There was an error!', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='homeTop'>
        <Link to={'/'}><button className='homeButton'>Home</button></Link>
      </div>
      <p className='otherParagraph'>Create a <i>New Project</i> in this place to request Hardware</p>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <form onSubmit={handleCreateProject}>
          <div style={{ marginTop: "0px" }}>
            <div >
              <label className='labelSignUp'>Project ID: </label>
              <div className='alignText'>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  style={{ marginLeft: "10px" }}
                  className='textBox'
                  placeholder="Enter Project ID"
                />
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <label className='labelSignUp'>Name: </label>
              <div className='alignText'>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ marginLeft: "10px" }}
                  className='textBox'
                  placeholder="Enter Name"
                />
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <label className='labelSignUp'>Description: </label>
              <div className='alignText'>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ marginLeft: "10px" }}
                  className='textBox'
                  placeholder="Enter Description"
                />
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <button type="submit" className='ButtonSign buttonPlace'>Create Project</button>
            </div>
            {message && <p>{message}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default NewProject;
