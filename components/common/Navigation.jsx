import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav style={{
      background: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <Link to="/dashboard" style={{
            textDecoration: 'none',
            color: '#1976d2',
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}>
            Internship Tracker
          </Link>
          
          <div style={{
            display: 'flex',
            gap: '1.5rem'
          }}>
            <Link to="/dashboard" style={{
              textDecoration: 'none',
              color: isActive('/dashboard') ? '#1976d2' : '#666',
              fontWeight: isActive('/dashboard') ? '600' : '400',
              padding: '0.5rem 0',
              borderBottom: isActive('/dashboard') ? '2px solid #1976d2' : 'none'
            }}>
              Dashboard
            </Link>
            
            <Link to="/internships" style={{
              textDecoration: 'none',
              color: isActive('/internships') ? '#1976d2' : '#666',
              fontWeight: isActive('/internships') ? '600' : '400',
              padding: '0.5rem 0',
              borderBottom: isActive('/internships') ? '2px solid #1976d2' : 'none'
            }}>
              Internships
            </Link>
            
            <Link to="/application-tracker" style={{
              textDecoration: 'none',
              color: isActive('/application-tracker') ? '#1976d2' : '#666',
              fontWeight: isActive('/application-tracker') ? '600' : '400',
              padding: '0.5rem 0',
              borderBottom: isActive('/application-tracker') ? '2px solid #1976d2' : 'none'
            }}>
              Applications
            </Link>
            
            <Link to="/profile" style={{
              textDecoration: 'none',
              color: isActive('/profile') ? '#1976d2' : '#666',
              fontWeight: isActive('/profile') ? '600' : '400',
              padding: '0.5rem 0',
              borderBottom: isActive('/profile') ? '2px solid #1976d2' : 'none'
            }}>
              Profile
            </Link>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid #1976d2',
            color: '#1976d2',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#1976d2';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#1976d2';
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 