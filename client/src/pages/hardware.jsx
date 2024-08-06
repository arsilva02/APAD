import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarResource from './navBarHardware';
import './resource.css'; // Import the new CSS file

const Resource = () => {
  const [resources, setResources] = useState({
    HWSet1: { capacity: 10, available: 3, request: 0 },
    HWSet2: { capacity: 8, available: 6, request: 0 }
  });

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

  const handleCheckIn = (hwSet) => {
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
  };

  const handleCheckOut = (hwSet) => {
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
              <th>Availablity</th>
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
