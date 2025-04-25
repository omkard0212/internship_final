import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <h1 style={{
          color: '#3a86ff',
          margin: 0,
          fontSize: '1.5rem'
        }}>
          Internship Tracker
        </h1>
      </div>
      
      {currentUser && (
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            marginRight: '15px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <img 
              src={currentUser.profilePic || "https://via.placeholder.com/40"} 
              alt="Profile" 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                marginRight: '10px'
              }}
            />
            <span style={{ fontWeight: '500' }}>
              {currentUser.name}
            </span>
          </div>
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;