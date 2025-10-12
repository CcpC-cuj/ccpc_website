import React from 'react';
import PropTypes from 'prop-types';

/**
 * Skeleton Loader Component for content placeholders
 * @param {number} lines - Number of skeleton lines
 * @param {string} height - Height of each line
 * @param {string} className - Additional CSS classes
 */
const SkeletonLoader = ({ lines = 3, height = 'h-4', className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`} role="status" aria-label="Loading content">
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={`bg-gray-300 rounded ${height} mb-2 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

SkeletonLoader.propTypes = {
  lines: PropTypes.number,
  height: PropTypes.string,
  className: PropTypes.string
};

export default SkeletonLoader;