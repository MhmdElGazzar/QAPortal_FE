import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>QA Portal</h1>
      <nav>
        <ul>
          <li>
            <Link to="/project-info">Project Info</Link>
          </li>
          <li>
            <Link to="/estimate-story">Estimate Story</Link>
          </li>
          <li>
            <Link to="/create-quality-tasks">Create Quality Tasks</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
