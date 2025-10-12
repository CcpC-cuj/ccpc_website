import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading Spinner Component
 * @param {string} size - Size of the spinner (sm, md, lg)
 * @param {string} color - Color theme of the spinner
 * @param {string} text - Optional loading text
 */
const LoadingSpinner = ({ size = 'md', color = 'blue', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <div className="flex flex-col items-center justify-center" role="status" aria-label={text}>
      <div 
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}
        aria-hidden="true"
      />
      {text && (
        <span className="sr-only">{text}</span>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['blue', 'white', 'gray']),
  text: PropTypes.string
};

export default LoadingSpinner;