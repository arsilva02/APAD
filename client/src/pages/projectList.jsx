import React, { useState, useEffect } from 'react';
import Navbar from './navBar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post('http://localhost:5000/get_user_projects_list', { username: 'your_username' });
        setProjects(response.data.projects);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          console.error('There was an error!', error);
        }
      }
    };

    fetchProjects();
  }, []);

  const handleSelectProject = (project) => {
    navigate('/hardware', { state: { project } });
  };

  return (
    <>
      <Navbar />
      <div className='homeTop'>
        <Link to={'/'}><button className='ProjectButton'>Home</button></Link>
      </div>
      <div className='homeTop'>
        <Link to={'/project'}><button className='ProjectButton'>Create Project</button></Link>
      </div>
      <div className='homeTop'>
        <Link to={'/newProject'}><button className='ProjectButton'>Login with Project ID</button></Link>
      </div>
      <p className='otherParagraph'>Select a project to view or join and manage hardware</p>
      <div className='project-list'>
        {projects.map((project) => (
          <div key={project.project_id} className='project-card'>
            <h3>{project.project_name}</h3>
            <p>{project.description}</p>
            <div className='hw-usage'>
              {project.hw_sets.map((hw) => (
                <div key={hw.hw_name}>
                  <p>{hw.hw_name}: {hw.available}/{hw.capacity}</p>
                </div>
              ))}
            </div>
            <button className='ButtonSign' onClick={() => handleSelectProject(project)}>
              Select
            </button>
          </div>
        ))}
      </div>
      {message && <p>{message}</p>}
    </>
  );
};

export default ProjectsList;
