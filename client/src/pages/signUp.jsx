import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillInfoCircleFill } from "react-icons/bs";
import axios from 'axios';
import Navbar from './navBar';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formData;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberCheck = /[1234567890]/;

    if (username === '' || password === '' || confirmPassword === ''){
        alert('All the fields are mandatory');
    }
    else if (password.length < 8){
        alert("Not a Strong Password. There should be more than 8 characters");
    }
    else if (password !== confirmPassword) {
      alert('Passwords do not match');
    } 
    else if (!specialCharacterRegex.test(password)) {
        alert('Password must include at least one special character');
    }
    else if (!numberCheck.test(password)) {
        alert('Password must include at least one number');
    }
    else {
      try {
        const response = await axios.post('http://localhost:5000/add_user', { username, password });
        setMessage(response.data.message);
        if (response.data.success) {
          window.location.href = '/login';
        }
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          console.error('There was an error!', error);
        }
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className='homeTop'>
        <Link to={'/'} ><button className='homeButton'>Home</button></Link>
      </div>
      <p className='otherParagraph'>Please create your account by giving unique username and a password</p>
      <form onSubmit={handleSubmit}>
        <div className='formGroup'>
          <label className='labelSignUp'>User ID: </label>
          <input
            type="text"
            placeholder="Enter email or User ID"
            name="username"
            autoComplete="username"
            className='textBox'
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className='formGroup'>
          <label className='labelSignUp'>Password: </label>
          <span className='i-tooltip'>
            <BsFillInfoCircleFill color="#bf5700" fontSize="15px"/>
            <span className='i-tooltiptext'>Password must be at least 8 characters long and include a number and a special character.</span>
          </span>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            autoComplete="current-password"
            className='textBox'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className='formGroup'>
          <label className='labelSignUp'>Confirm Password: </label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className='textBox'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='ButtonSign buttonPlace'>Create Account</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
