import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navBarHardware';

const Resource = () => {
  const [resources, setResources] = useState({
    HWSet1: { capacity: 10, available: 3, request: 1 },
    HWSet2: { capacity: 8, available: 6, request: 2 }
  });

  const handleInputChange = (e, hwSet) => {
    const { name, value } = e.target;
    setResources({
      ...resources,
      [hwSet]: {
        ...resources[hwSet],
        [name]: parseInt(value) || 0
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
            available: newAvailable
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
            available: newAvailable
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
      <Navbar />
      
      <div className='homeButton'>
        <Link to={'/'}><button className='routerButton'>Home</button></Link>
      </div>
      <div className='pageText'>
        Please feel free to Return or Avail Items:
      </div>
      <div className='resource'>
      
        {Object.keys(resources).map((hwSet) => (
          <div key={hwSet}>
            <div className='formDataResource'>{hwSet}:</div>
            <input
              type="number"
              name="capacity"
              value={resources[hwSet].capacity}
              readOnly
              className='textBox'
            />
            <input
              type="number"
              name="available"
              value={resources[hwSet].available}
              readOnly
              className='textBox'
            />
            <input
              type="number"
              name="request"
              value={resources[hwSet].request}
              onChange={(e) => handleInputChange(e, hwSet)}
              className='textBox'
            />
          </div>
        ))}
        <div className='resourceActions'>
          <button className='ButtonHardware' onClick={() => handleCheckIn('HWSet1')}>Check In Hardware Set 1</button>
          <button className='ButtonHardware' onClick={() => handleCheckOut('HWSet1')}>Check Out Hardware Set 1</button><br></br>
          <button className='ButtonHardware' onClick={() => handleCheckIn('HWSet2')}>Check In Hardware Set 2</button>
          <button className='ButtonHardware' onClick={() => handleCheckOut('HWSet2')}>Check Out Hardware Set 2</button>
        </div>
      </div>
    </>
  );
};

export default Resource;
