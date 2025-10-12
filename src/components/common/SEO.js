import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEO Component for managing page metadata
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} keywords - Page keywords
 * @param {string} image - Open Graph image URL
 * @param {string} url - Canonical URL
 * @param {string} type - Open Graph type (website, article, etc.)
 */
const SEO = ({
  title = 'Code Crafters Programming Club',
  description = 'Code Crafters Programming Club is an exciting initiative designed to ignite a passion for coding within our institution. Join us to innovate, collaborate, and elevate your programming skills.',
  keywords = 'programming, coding, club, students, technology, software development, CCPC, Code Crafters',
  image = '/logo.svg',
  url = window.location.href,
  type = 'website'
}) => {
  const fullTitle = title.includes('Code Crafters') ? title : `${title} | Code Crafters Programming Club`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Code Crafters Programming Club" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Code Crafters Programming Club" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#3B82F6" />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string
};

export default SEO;