import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navBar';

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="home">
      <p className='homeParagraph'>Welcome to oru Hardware as a Service (HaaS). Please Sign-In or Login to avail the hardware</p>
      <div className="routerElements">
        <Link to="/signup" className="linkSpace">
          <button className="routerButton">New User?</button>
        </Link>
        <Link to="/login" className="linkSpace">
          <button className="routerButton">Login</button>
        </Link>
      </div>
    </div>
    </>
    
  );
};

export default Home;
