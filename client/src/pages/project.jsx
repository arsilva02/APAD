import React, { useState } from "react";
import Navbar from "./navBar";
import { Link } from "react-router-dom";

function Project() {
  return (
    <>
      <Navbar />
      <div className="homeTop">
        <Link to={"/"}>
          <button className="routerButton">Home</button>
        </Link>
      </div>
      <p className='otherParagraph'>Give a <i>Project ID</i> to join a project and request Hardware</p>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <div style={{ marginTop: "0px" }}>
          <div className='formGroup'>
            <label htmlFor="projectid" className='labelSignUp'>Project ID: </label>
            <input type="text" className='textBox' id="projectid" placeholder="Enter Project ID" />
          </div>
          <div style={{ marginTop: "20px" }}>
            <button onClick={Project} className='ButtonSign buttonPlace'>Project Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
