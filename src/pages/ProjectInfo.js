import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectInfo() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [iterationPaths, setIterationPaths] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/project-info/');
        setTeamMembers(response.data.team_members);
        setIterationPaths(response.data.iteration_paths);
      } catch (err) {
        setError('Failed to fetch project information');
        console.error('Error:', err);
      }
    };

    fetchProjectInfo();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h1>Project Information</h1>
      
      <section>
        <h2>Team Members</h2>
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Iteration Paths</h2>
        <ul>
          {iterationPaths.map((path, index) => (
            <li key={index}>{path}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ProjectInfo;
