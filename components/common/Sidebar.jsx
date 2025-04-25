import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  
  // Active link style
  const activeStyle = {
    backgroundColor: 'rgba(58, 134, 255, 0.1)',
    borderRight: '3px solid #3a86ff',
    color: '#3a86ff',
    fontWeight: '600'
  };

  return (
    <aside style={{
      width: '250px',
      backgroundColor: 'white',
      height: 'calc(100vh - 64px)',
      borderRight: '1px solid #e9ecef',
      padding: '20px 0',
      position: 'fixed',
      left: 0,
      top: '64px',
      overflowY: 'auto'
    }}>
      <div style={{
        padding: '0 20px 20px',
        borderBottom: '1px solid #e9ecef',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <img 
          src={currentUser?.profilePic || "https://via.placeholder.com/100"} 
          alt="Profile" 
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            margin: '0 auto 10px'
          }}
        />
        <h3 style={{ margin: '5px 0', color: '#212529' }}>
          {currentUser?.name || 'Student'}
        </h3>
        <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>
          {currentUser?.department || 'Department'}
        </p>
      </div>
      
      <nav>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          <li>
            <NavLink 
              to="/dashboard" 
              style={{
                display: 'block',
                padding: '12px 20px',
                color: '#495057',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              className={({ isActive }) => 
                isActive ? 'active-link' : ''
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/internships" 
              style={{
                display: 'block',
                padding: '12px 20px',
                color: '#495057',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              className={({ isActive }) => 
                isActive ? 'active-link' : ''
              }
            >
              Available Internships
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/applications" 
              style={{
                display: 'block',
                padding: '12px 20px',
                color: '#495057',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              className={({ isActive }) => 
                isActive ? 'active-link' : ''
              }
            >
              My Applications
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/reports" 
              style={{
                display: 'block',
                padding: '12px 20px',
                color: '#495057',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              className={({ isActive }) => 
                isActive ? 'active-link' : ''
              }
            >
              Reports & Analytics
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div style={{
        padding: '20px',
        marginTop: 'auto',
        borderTop: '1px solid #e9ecef',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>
          Student ID: {currentUser?.id || 'N/A'}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;