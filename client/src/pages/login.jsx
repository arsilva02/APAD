import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navBar';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (username === '' || password === ''){
        alert('All the fields are mandatory');
    } else {
      // Communicate with Flask backend here
      console.log(`Username: ${username}, Password: ${password}`);
      alert('Login attempt for Username: ' + username);
      window.location.href = '#/Project';
    }
  };

  return (
    <div>

    
      <form className='signUp' onSubmit={handleSubmit}>
        <label className='labelSignUp'>
          User ID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <input
          type="text"
          placeholder="Enter email or User ID"
          name="username"
          autoComplete="username"
          className='textBox'
          value={formData.username}
          onChange={handleChange}
        />
        <br /><br />
        <label className='labelPass'>
          Password: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          autoComplete="current-password"
          className='textBox'
          value={formData.password}
          onChange={handleChange}
        />
        <br /><br />
        <button type="submit" className='ButtonSign'>
          Login
        </button>
      </form>
    </div>
  );
};

export default function Login() {
  return (
    <>
      <Navbar />
      <Link to={'/'}><button className='routerButton'>Home</button></Link>
      
      <div className='pageText'>
        Please use your login credentials to proceed further:
      </div>
      <div>
        <LoginPage />
      </div>
    </>
  );
}


