import { useState } from 'react';
import { Link} from 'react-router-dom';
import Navbar from './navBar';
import { BsFillInfoCircleFill } from "react-icons/bs";
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
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
    const { username, password, confirmPassword } = formData;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberCheck = /[1234567890]/;
    
    if (username === '' || password === '' || confirmPassword === ''){
        alert('All the fields are mandatory')
    }
    else if (password.length < 8){
        alert("Not a Strong Password. There should be more than 8 characters")
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
      console.log(`Username: ${username}, Password: ${password}`);
      alert('Account created successfully with Username:'+username);
      window.location.href = '#/login';
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
        <span className='i-tooltip'>
        <BsFillInfoCircleFill color="#bf5700" fontSize="15px"/><span className='i-tooltiptext'>Password must be at least 8 characters long and include a number and a special character.</span>
        </span>
        <br /><br />
        <label className='labelPass'>
          Confirm Password:
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className='textBox'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <button type="submit" className='ButtonSign'>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default function newUser() {
  return (
    <>
      <Navbar />
      <div className='homeButton'>
        <Link to={'/'}><button className='routerButton'>Home</button></Link>
      </div>
      <div className='pageText'>
        Please give a Username and a Password to Sign-up and create an account
      </div>
      <div>
        <AdminLogin />
      </div>
    </>
  );
}
