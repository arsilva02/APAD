import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavbarResource from './navBarHardware';
import axios from 'axios';
import './resource.css'; // Import the new CSS file

const Resource = () => {
  const location = useLocation();
  const { project } = location.state || {};
  const [resources, setResources] = useState({});

  useEffect(() => {
    if (project) {
      const fetchResources = async () => {
        try {
          const hwData = {};
          for (const hw of project.hw_sets) {
            hwData[hw.hw_name] = {
              capacity: hw.capacity,
              available: hw.available,
              request: 0
            };
          }
          setResources(hwData);
        } catch (error) {
          console.error('Error fetching hardware sets:', error);
        }
      };
      fetchResources();
    }
  }, [project]);

  const handleInputChange = (e, hwSet) => {
    const { value } = e.target;
    setResources({
      ...resources,
      [hwSet]: {
        ...resources[hwSet],
        request: parseInt(value) || 0
      }
    });
  };

  const handleCheckIn = async (hwSet) => {
    try {
      const response = await axios.post('http://localhost:5000/check_in', {
        projectId: project.project_id,
        hwName: hwSet,
        quantity: resources[hwSet].request,
        userId: 'default_user' // Replace with actual user ID
      });
      if (response.data.success) {
        setResources((prevResources) => {
          const newAvailable = prevResources[hwSet].available + prevResources[hwSet].request;
          if (newAvailable <= prevResources[hwSet].capacity) {
            return {
              ...prevResources,
              [hwSet]: {
                ...prevResources[hwSet],
                available: newAvailable,
                request: 0
              }
            };
          } else {
            alert(`${hwSet} availability cannot exceed its capacity.`);
            return prevResources;
          }
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error checking in hardware:', error);
    }
  };

  const handleCheckOut = async (hwSet) => {
    try {
      const response = await axios.post('http://localhost:5000/check_out', {
        projectId: project.project_id,
        hwName: hwSet,
        quantity: resources[hwSet].request,
        userId: 'default_user' // Replace with actual user ID
      });
      if (response.data.success) {
        setResources((prevResources) => {
          const newAvailable = prevResources[hwSet].available - prevResources[hwSet].request;
          if (newAvailable >= 0) {
            return {
              ...prevResources,
              [hwSet]: {
                ...prevResources[hwSet],
                available: newAvailable,
                request: 0
              }
            };
          } else {
            alert(`${hwSet} availability cannot be negative.`);
            return prevResources;
          }
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error checking out hardware:', error);
    }
  };

  return (
    <>
      <NavbarResource />
      <div className='homeTop'>
        <Link to={'/'}><button className='routerButton'>Home</button></Link>
      </div>
      <br></br>
      <div className='otherParagraph'>
        Please feel free to Return or Avail Items:
      </div>
      <div className='resource'>
        <table className='resourceTable'>
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
            {Object.keys(resources).map((hwSet) => (
              <tr key={hwSet}>
                <td>{hwSet}</td>
                <td>
                  <input
                    type="number"
                    name="capacity"
                    value={resources[hwSet].capacity}
                    readOnly
                    className='textBox1'
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="available"
                    value={resources[hwSet].available}
                    readOnly
                    className='textBox1'
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="request"
                    value={resources[hwSet].request}
                    onChange={(e) => handleInputChange(e, hwSet)}
                    className='textBox1'
                  />
                </td>
                <td className='resourceActions'>
                  <button className='ButtonHardware' onClick={() => handleCheckIn(hwSet)}>Check In</button>
                  <button className='ButtonHardware' onClick={() => handleCheckOut(hwSet)}>Check Out</button>
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
