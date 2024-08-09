import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navBarHardware";
import axios from "axios";
import "./resource.css"; // Import the CSS file

const Resource = () => {
  const location = useLocation();
  const { project, username } = location.state || {}; // Retrieve project and username from state

  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (project && project.project_id && username) {
      // Fetch hardware data based on projectId and username
      axios
        .post("http://localhost:5000/get_hw_info", {
          project_id: project.project_id,
          username,
        })
        .then((response) => {
          if (response.data.success) {
            // Update state with fetched hardware data
            const hwInfo = response.data.hw_info;

            // Format hwInfo into the format expected by the frontend
            const formattedResources = [
              {
                hw_name: hwInfo.hwName,
                capacity: hwInfo.capacity,
                available: hwInfo.availability,
                request: 0, // Initial request value set to 0
              },
            ];

            setResources(formattedResources);
          } else {
            console.error(
              "Error fetching hardware info:",
              response.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching hardware info:", error);
        });
    }
  }, [project, username]);

  const handleInputChange = (e, hwSet) => {
    const { value } = e.target;
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.hw_name === hwSet.hw_name
          ? { ...resource, request: parseInt(value) || 0 }
          : resource
      )
    );
  };

  const handleCheckIn = (hwSet) => {
    setResources((prevResources) =>
      prevResources.map((resource) => {
        if (resource.hw_name === hwSet.hw_name) {
          const newAvailable = resource.available + resource.request;
          if (newAvailable <= resource.capacity) {
            return { ...resource, available: newAvailable, request: 0 };
          } else {
            alert(
              $,
              { hwSet: hw_name },
              "availability cannot exceed its capacity."
            );
          }
        }
        return resource;
      })
    );
  };

  const handleCheckOut = (hwSet) => {
    setResources((prevResources) =>
      prevResources.map((resource) => {
        if (resource.hw_name === hwSet.hw_name) {
          const newAvailable = resource.available - resource.request;
          if (newAvailable >= 0) {
            return { ...resource, available: newAvailable, request: 0 };
          } else {
            alert($, { hwSet: hw_name }, "availability cannot be negative.");
          }
        }
        return resource;
      })
    );
  };

  return (
    <>
      <Navbar />
      <div className="homeTop">
        <h2>Project: {project.project_id}</h2>
        <p>User: {username}</p>
        {/* Display hardware sets and actions */}
      </div>
      <div className="otherParagraph">
        Please feel free to Return or Avail Items:
      </div>
      <div className="resource">
        <table className="resourceTable">
          <thead>
            <tr>
              <th>Hardware Set</th>
              <th>Capacity</th>
              <th>Availability</th>
              <th>Request/Return</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((hwSet) => (
              <tr key={hwSet.hw_name}>
                <td>{hwSet.hw_name}</td>
                <td>
                  <input
                    type="number"
                    name="capacity"
                    value={hwSet.capacity}
                    readOnly
                    className="textBox1"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="available"
                    value={hwSet.available}
                    readOnly
                    className="textBox1"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="request"
                    value={hwSet.request || 0}
                    onChange={(e) => handleInputChange(e, hwSet)}
                    className="textBox1"
                  />
                </td>
                <td className="resourceActions">
                  <button
                    className="ButtonHardware"
                    onClick={() => handleCheckIn(hwSet)}
                  >
                    Check In
                  </button>
                  <button
                    className="ButtonHardware"
                    onClick={() => handleCheckOut(hwSet)}
                  >
                    Check Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Resource;
