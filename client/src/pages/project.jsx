import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navBar';

const Project = () => {
  return (
    <>
    <Navbar />
    <div className="home">
      <h1>Project Page</h1>
      <div className="routerElements">
        <Link to="/project" className="linkSpace">
          <button className="routerButton">Submit</button>
        </Link>
        
      </div>
    </div>
    </>
    
  );
};

export default Project;
