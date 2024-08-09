import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navBar";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (username === "" || password === "") {
      alert("All the fields are mandatory");
    } else {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          username,
          password,
        });
        setMessage(response.data.message);
        if (response.data.success) {
          localStorage.setItem("username", username); // Store the username in localStorage
          navigate("/projectList");
        }
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          console.error("There was an error!", error);
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="labelSignUp">User ID: </label>
          <input
            type="text"
            placeholder="Enter email or User ID"
            name="username"
            autoComplete="username"
            className="textBox"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label className="labelSignUp">Password: </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            autoComplete="current-password"
            className="textBox"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="ButtonSign buttonPlace">
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="homeTop">
        <Link to={"/"}>
          <button className="homeButton">Home</button>
        </Link>
      </div>
      <div className="pageText">
        Please use your login credentials to proceed further:
      </div>
      <br />
      <div>
        <LoginPage />
      </div>
    </>
  );
}
