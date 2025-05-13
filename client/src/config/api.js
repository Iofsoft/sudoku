// API configuration file

// Default API base URL for development
const API_BASE_URL = 'http://localhost:5000';

// Export API configuration
export default {
  baseURL: API_BASE_URL,
  endpoints: {
    login: '/login',
    register: '/register',
    record: '/record',
    logout: '/logout',
    game: '/game'
  }
};

