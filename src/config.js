const isLocal = process.env.REACT_APP_ENV === 'local';

const config = {
  apiUrl: isLocal ? 'http://localhost:8000' : 'https://django-app-kxp3.onrender.com'
};

export default config;
