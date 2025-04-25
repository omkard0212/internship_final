import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',
      padding: '15px',
      textAlign: 'center',
      borderTop: '1px solid #dee2e6',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p style={{ margin: 0, color: '#6c757d' }}>
          &copy; {new Date().getFullYear()} Internship Tracker Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;