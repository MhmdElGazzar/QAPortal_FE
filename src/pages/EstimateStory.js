import React, { useState } from 'react';
import axios from 'axios';

function EstimateStory() {
  const [storyId, setStoryId] = useState('');
  const [storyDetails, setStoryDetails] = useState(null);
  const [estimates, setEstimates] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:8000/api/estimate-story/', {
        story_id: storyId
      });
      
      setStoryDetails({
        title: response.data.story_title,
        description: response.data.story_description
      });
      setEstimates(response.data.estimates);
    } catch (err) {
      setError('Failed to fetch story details and estimates');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Estimate Story</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="storyId">Story ID:</label>
          <input
            type="text"
            id="storyId"
            value={storyId}
            onChange={(e) => setStoryId(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Estimates'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {storyDetails && (
        <div className="story-details">
          <h2>Story Details</h2>
          <h3>{storyDetails.title}</h3>
          <p>{storyDetails.description}</p>
        </div>
      )}

      {estimates && (
        <div className="estimates">
          <h2>Estimated Hours</h2>
          <ul>
            {Object.entries(estimates).map(([task, hours]) => (
              <li key={task}>
                <strong>{task}:</strong> {hours} hours
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EstimateStory;
