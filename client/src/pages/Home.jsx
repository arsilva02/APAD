import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navBar';

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="home">
      <h1>APP</h1>
      <div className="routerElements">
        <Link to="/signup" className="linkSpace">
          <button className="routerButton">New User?</button>
        </Link>
      </div>
    </div>
    </>
    
  );
};

export default Home;
