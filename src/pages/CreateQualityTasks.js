import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateQualityTasks() {
  const [formData, setFormData] = useState({
    assignee: '',
    userstory_id: '',
    iteration_path: '',
    tasks: [],
  });
  const [taskEstimates, setTaskEstimates] = useState({});
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskConfig, setTaskConfig] = useState({});

  useEffect(() => {
    // Load task configurations
    const fetchTaskConfig = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/task-config/');
        setTaskConfig(response.data);
      } catch (err) {
        setError('Failed to load task configurations');
        console.error('Error:', err);
      }
    };

    fetchTaskConfig();
  }, []);

  const handleTaskSelection = (taskType) => {
    const updatedTasks = formData.tasks.includes(taskType)
      ? formData.tasks.filter(t => t !== taskType)
      : [...formData.tasks, taskType];
    
    setFormData({
      ...formData,
      tasks: updatedTasks
    });
  };

  const handleEstimateChange = (taskType, value) => {
    setTaskEstimates({
      ...taskEstimates,
      [taskType]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const taskData = {
      ...formData,
      task_estimates: taskEstimates
    };

    try {
      const response = await axios.post('http://localhost:8000/api/create-quality-tasks/', taskData);
      setMessage(response.data.success_message);
      // Reset form
      setFormData({
        assignee: '',
        userstory_id: '',
        iteration_path: '',
        tasks: [],
      });
      setTaskEstimates({});
    } catch (err) {
      setError('Failed to create quality tasks');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Create Quality Tasks</h1>

      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="assignee">Assignee:</label>
          <input
            type="text"
            id="assignee"
            value={formData.assignee}
            onChange={(e) => setFormData({...formData, assignee: e.target.value})}
            required
          />
        </div>

        <div>
          <label htmlFor="userstory_id">User Story ID:</label>
          <input
            type="text"
            id="userstory_id"
            value={formData.userstory_id}
            onChange={(e) => setFormData({...formData, userstory_id: e.target.value})}
            required
          />
        </div>

        <div>
          <label htmlFor="iteration_path">Iteration Path:</label>
          <input
            type="text"
            id="iteration_path"
            value={formData.iteration_path}
            onChange={(e) => setFormData({...formData, iteration_path: e.target.value})}
            required
          />
        </div>

        <div>
          <h3>Select Tasks:</h3>
          {Object.entries(taskConfig).map(([taskType, config]) => (
            <div key={taskType} className="task-item">
              <label>
                <input
                  type="checkbox"
                  checked={formData.tasks.includes(taskType)}
                  onChange={() => handleTaskSelection(taskType)}
                />
                {config.title}
              </label>
              {formData.tasks.includes(taskType) && (
                <div>
                  <label>Estimate (hours):</label>
                  <input
                    type="number"
                    value={taskEstimates[taskType] || ''}
                    onChange={(e) => handleEstimateChange(taskType, e.target.value)}
                    required
                    min="0"
                    step="0.5"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Tasks...' : 'Create Tasks'}
        </button>
      </form>
    </div>
  );
}

export default CreateQualityTasks;
