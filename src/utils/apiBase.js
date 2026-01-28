// Utility to determine the correct API base URL at runtime.
// Prefers REACT_APP_API_BASE_URL, but if running on production frontend
// and the env points to localhost, fall back to the Render URL.
const DEFAULT_LOCAL = 'http://localhost:5002';
const RENDER_PROD = 'https://ccpc-regitration.onrender.com';

export function getApiBase() {
  const env = (process.env.REACT_APP_API_BASE_URL || DEFAULT_LOCAL).split('||')[0].trim();

  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    // If running on your Firebase hosted frontend, prefer the Render production URL
    if (origin.includes('ccpc-cuj.web.app') || origin.includes('ccpc-cuj.firebaseapp.com')) {
      // If env is localhost, override with Render prod URL
      if (env.startsWith('http://localhost') || env.startsWith('http://127.0.0.1')) {
        return RENDER_PROD;
      }
      return env;
    }
  }

  return env;
}

export default getApiBase;
