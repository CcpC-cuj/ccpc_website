// Utility to determine the correct API base URL at runtime.
// Always uses HuggingFace backend for admin and public features
const DEFAULT_LOCAL = 'http://localhost:3000';
const HF_PROD = 'https://ccpccuj-mem-reg-2026.hf.space';

export function getApiBase() {
  // For local development, use localhost if REACT_APP_API_BASE_URL is set to localhost
  const env = (process.env.REACT_APP_API_BASE_URL || DEFAULT_LOCAL).split('||')[0].trim();

  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    
    // For production Firebase hosting, always use HuggingFace
    if (origin.includes('ccpc-cuj.web.app') || origin.includes('ccpc-cuj.firebaseapp.com')) {
      return HF_PROD;
    }
    
    // For localhost dev, use local backend if explicitly set, otherwise HuggingFace
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      if (env.startsWith('http://localhost') || env.startsWith('http://127.0.0.1')) {
        return env; // Use local backend
      }
      return HF_PROD; // Use HuggingFace if no local backend available
    }
  }

  // Default to HuggingFace for all other cases
  return HF_PROD;
}

export default getApiBase;
