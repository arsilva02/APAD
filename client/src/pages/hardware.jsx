import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navBarHardware";
import axios from "axios";
import "./resource.css"; // Import custom CSS for styling

const Hardware = () => {
  const location = useLocation();
  const { project, username } = location.state || {}; // Retrieve project and username from state
  const navigate = useNavigate();
  const [hardwareData, setHardwareData] = useState([]); // To store hardware data
  const [requestAmount, setRequestAmount] = useState({}); // To store requested amounts for check-in/out

  useEffect(() => {
    fetchHardwareData();
  }, [project]);

  const fetchHardwareData = () => {
    if (project && project.projectId) {
      axios
        .post("http://localhost:5000/get_combined_project_info", {
          project_id: project.projectId,
        })
        .then((response) => {
          if (response.data.success) {
            console.log(
              "Combined data received from backend:",
              response.data.project
            );
            setHardwareData(response.data.project.hw_sets_details);
          } else {
            console.error(
              "Error fetching combined project info:",
              response.data.message
            );
          }
        })
        .catch((error) => {
          console.error(
            "Error fetching combined project info:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  const handleInputChange = (e, hwSetName) => {
    setRequestAmount({
      ...requestAmount,
      [hwSetName]: parseInt(e.target.value, 10) || 0,
    });
  };

  const handleCheckIn = (hwSet) => {
    const amount = requestAmount[hwSet.hw_name] || 0;
    const newAvailable = hwSet.available + amount;

    if (newAvailable > hwSet.capacity) {
      alert(
        `Check-in failed. Availability cannot exceed capacity for ${hwSet.hw_name}.`
      );
      return;
    }

    axios
      .post("http://localhost:5000/check_in", {
        projectId: project.projectId,
        hwName: hwSet.hw_name,
        quantity: amount,
        userId: username,
      })
      .then((response) => {
        if (response.data.success) {
          alert(`${amount} units checked in successfully for ${hwSet.hw_name}`);
          fetchHardwareData(); // Refresh hardware data
        } else {
          alert("Check-in failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error(
          "Error during check-in:",
          error.response ? error.response.data : error.message
        );
        alert("An error occurred during check-in. Provide a proper value");
      });
  };

  const handleCheckOut = (hwSet) => {
    const amount = requestAmount[hwSet.hw_name] || 0;

    axios
      .post("http://localhost:5000/check_out", {
        projectId: project.projectId,
        hwName: hwSet.hw_name,
        quantity: amount,
        userId: username,
      })
      .then((response) => {
        if (response.data.success) {
          alert(
            `${amount} units checked out successfully for ${hwSet.hw_name}`
          );
          fetchHardwareData(); // Refresh hardware data
        } else {
          alert("Check-out failed. Please try again with proper value");
        }
      })
      .catch((error) => {
        console.error(
          "Error during check-out:",
          error.response ? error.response.data : error.message
        );
        alert(
          "An error occurred during check-out. Please provide a proper value"
        );
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove user info from localStorage
    navigate("/"); // Redirect to the login page
  };

  return (
    <>
      <Navbar />
      <div className="alignButtonLogout">
        <button onClick={handleLogout} className="LogoutButton">
          Logout
        </button>
      </div>
      <div className="hardware-container">
        <h2 className="hardware-title">Project: {project.projectId}</h2>
        <p className="hardware-subtitle">User: {username}</p>
        <div className="hardware-info">
          <h3>Hardware Sets Information</h3>
          {hardwareData.length > 0 ? (
            hardwareData.map((hwSet, index) => (
              <div key={index} className="hardware-set">
                <h4>{hwSet.hw_name}</h4>
                <p>Capacity: {hwSet.capacity}</p>
                <p>Available: {hwSet.available}</p>
                <p>Usage in Project: {hwSet.project_usage}</p>
                <div className="hardware-actions">
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter whole number"
                    onChange={(e) => handleInputChange(e, hwSet.hw_name)}
                    className="textBox1"
                  />
                  &nbsp;&nbsp;&nbsp;
                  <button
                    onClick={() => handleCheckIn(hwSet)}
                    className="routerButton"
                  >
                    Check In
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    onClick={() => handleCheckOut(hwSet)}
                    className="routerButton"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hardware data available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Hardware;
