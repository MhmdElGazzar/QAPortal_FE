import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectInfo from './pages/ProjectInfo';
import EstimateStory from './pages/EstimateStory';
import CreateQualityTasks from './pages/CreateQualityTasks';
import Settings from './pages/Settings';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project-info" element={<ProjectInfo />} />
          <Route path="/estimate-story" element={<EstimateStory />} />
          <Route path="/create-quality-tasks" element={<CreateQualityTasks />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
