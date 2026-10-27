import React from 'react';

export const NodeJsLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg 
    viewBox="0 0 256 289" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M128 0L249.2 69.9V209.7L128 279.6L6.8 209.7V69.9L128 0Z" 
      fill="#333333" 
    />
    <path 
      d="M128 17.5L234.1 78.7V200.9L128 262.1L21.9 200.9V78.7L128 17.5Z" 
      fill="#5FA04E" 
    />
    <path 
      d="M128 55L198.8 95.8V177.5L128 218.3L57.2 177.5V95.8L128 55Z" 
      fill="#43853D" 
    />
    {/* Inner Node 'N' path */}
    <path 
      d="M128 92.5L164.5 113.6V155.8L147.2 165.8V128.5L128 117.4L108.8 128.5V173.2L128 184.3L147.2 173.2V178.6L128 189.7L91.5 168.6V126.4L128 92.5Z" 
      fill="#FFFFFF" 
    />
  </svg>
);

export const GitLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg 
    viewBox="0 0 256 256" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M249.4 114.7L141.3 6.6c-8.8-8.8-23-8.8-31.8 0L87.2 28.9l39.5 39.5c9.4-3.2 20.4-1 27.8 6.5 7.4 7.4 9.6 18.5 6.5 27.8l38 38c9.4-3.2 20.4-1 27.8 6.5 12.1 12.1 12.1 31.8 0 43.9-12.1 12.1-31.8 12.1-43.9 0-7.8-7.8-9.9-19.2-6.2-28.7l-35.4-35.4v58.2c2.5 1.7 4.9 3.8 6.9 6.2 12.1 12.1 12.1 31.8 0 43.9-12.1 12.1-31.8 12.1-43.9 0-12.1-12.1-12.1-31.8 0-43.9 2.5-2.5 5.5-4.4 8.7-5.7v-59.2c-3.2-1.3-6.2-3.2-8.7-5.7-7.8-7.8-9.9-19.2-6.2-28.7L60.9 55.2 6.6 109.5c-8.8 8.8-8.8 23 0 31.8l108.1 108.1c8.8 8.8 23 8.8 31.8 0l102.9-102.9c8.8-8.8 8.8-23 0-31.8z" 
      fill="#F05032" 
    />
  </svg>
);

export const BrowserLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg 
    viewBox="0 0 256 256" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="128" cy="128" r="120" fill="#2563EB" opacity="0.15" />
    <circle cx="128" cy="128" r="110" stroke="#3B82F6" strokeWidth="12" />
    <path 
      d="M128 18C67.2 18 18 67.2 18 128s49.2 110 110 110 110-49.2 110-110S188.8 18 128 18zm0 18c21.2 0 40.8 7.3 56.4 19.5L128 128H48.4C56.2 73.4 97.4 36 128 36zm-86.8 92H128l48.4 83.8C161.4 216.7 145.2 220 128 220c-50.8 0-92-41.2-92-92zm148.8 76.5L145.6 128l44.4-76.9C208.7 69.4 220 97.3 220 128c0 30.7-11.3 58.6-30 76.5z" 
      fill="#60A5FA" 
    />
    <circle cx="128" cy="128" r="42" fill="#3B82F6" />
    <circle cx="128" cy="128" r="32" fill="#FFFFFF" />
  </svg>
);
