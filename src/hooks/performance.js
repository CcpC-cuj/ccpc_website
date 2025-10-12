import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for performance monitoring
 * @param {string} componentName - Name of the component to monitor
 * @param {object} dependencies - Dependencies to monitor for re-renders
 */
export const usePerformanceMonitoring = (componentName, dependencies = {}) => {
  const renderCountRef = useRef(0);
  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    renderCountRef.current += 1;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} rendered ${renderCountRef.current} times`);
      
      if (renderCountRef.current === 1) {
        console.log(`${componentName} mounted in ${Date.now() - mountTimeRef.current}ms`);
      }
    }
  });

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && renderCountRef.current > 1) {
      console.log(`${componentName} re-rendered due to dependency change:`, dependencies);
    }
  }, [componentName, dependencies]);

  return renderCountRef.current;
};

/**
 * Custom hook for lazy loading images
 * @param {string} src - Image source URL
 * @param {object} options - Intersection Observer options
 */
export const useLazyImage = (src, options = {}) => {
  const imgRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  useEffect(() => {
    if (isIntersecting && src) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = src;
    }
  }, [isIntersecting, src]);

  return {
    imgRef,
    src: isIntersecting ? src : undefined,
    isLoaded
  };
};

/**
 * Custom hook for managing document title
 * @param {string} title - Page title
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};