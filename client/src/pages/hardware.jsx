import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navBar';

const Hardware = () => {
  return (
    <>
    <Navbar />
    <div className="home">
      <h1>Hardware Page</h1>
      <div className="routerElements">
        <Link to="/project" className="linkSpace">
          <button className="routerButton">Submit</button>
        </Link>
        
      </div>
    </div>
    </>
    
  );
};

export default Hardware;
