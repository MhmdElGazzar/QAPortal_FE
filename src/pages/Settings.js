import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Settings() {
  const [settings, setSettings] = useState({
    azure_org: '',
    azure_project: '',
    azure_api_version: '',
    azure_pat: '',
    openai_key: ''
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/settings/');
        setSettings({
          azure_org: response.data.settings.AZURE_DEVOPS_ORG,
          azure_project: response.data.settings.AZURE_DEVOPS_PROJECT,
          azure_api_version: response.data.settings.AZURE_DEVOPS_API_VERSION,
          azure_pat: response.data.settings.AZURE_DEVOPS_PAT,
          openai_key: response.data.settings.OPENAI_API_KEY
        });
      } catch (err) {
        setError('Failed to load settings');
        console.error('Error:', err);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post('http://localhost:8000/api/settings/', settings);
      setMessage('Settings saved successfully!');
    } catch (err) {
      setError('Failed to save settings');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <h1>Settings</h1>

      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="azure_org">Azure DevOps Organization:</label>
          <input
            type="text"
            id="azure_org"
            name="azure_org"
            value={settings.azure_org}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="azure_project">Azure DevOps Project:</label>
          <input
            type="text"
            id="azure_project"
            name="azure_project"
            value={settings.azure_project}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="azure_api_version">Azure API Version:</label>
          <input
            type="text"
            id="azure_api_version"
            name="azure_api_version"
            value={settings.azure_api_version}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="azure_pat">Azure Personal Access Token:</label>
          <input
            type="password"
            id="azure_pat"
            name="azure_pat"
            value={settings.azure_pat}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="openai_key">OpenAI API Key:</label>
          <input
            type="password"
            id="openai_key"
            name="openai_key"
            value={settings.openai_key}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}

export default Settings;
