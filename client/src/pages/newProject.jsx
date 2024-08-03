import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navBar';

const NewProject = () => {
  return (
    <>
    <Navbar />
    <div className="home">
      <h1>New Project</h1>
      <div className="routerElements">
        <Link to="/login" className="linkSpace">
          <button className="routerButton">Submit</button>
        </Link>
        
      </div>
    </div>
    </>
    
  );
};

export default NewProject;
