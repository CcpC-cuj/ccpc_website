import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SkeletonLoader from './SkeletonLoader';

/**
 * Optimized Image Component with lazy loading and error handling
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - Additional CSS classes
 * @param {string} fallbackSrc - Fallback image source if main image fails
 * @param {React.ReactNode} placeholder - Custom placeholder component
 * @param {function} onLoad - Callback when image loads
 * @param {function} onError - Callback when image fails to load
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  fallbackSrc = '/api/placeholder/400/300',
  placeholder,
  onLoad,
  onError,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = (e) => {
    setLoading(false);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setLoading(false);
    setError(true);
    
    // Try fallback image if available and not already tried
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setError(false);
    } else {
      onError?.(e);
    }
  };

  // If className includes 'absolute', don't wrap in a div
  const isAbsolute = className.includes('absolute');
  const imgElement = (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          {placeholder || <SkeletonLoader lines={1} height="h-full" />}
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      {error && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </>
  );
  if (isAbsolute) {
    return imgElement;
  }
  return <div className={`relative overflow-hidden ${className}`}>{imgElement}</div>;
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallbackSrc: PropTypes.string,
  placeholder: PropTypes.node,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default OptimizedImage;