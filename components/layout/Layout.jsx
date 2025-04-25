import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!user) {
    return children;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
      background: '#f5f5f5'
    }}>
      {/* Header/Navbar */}
      <header style={{
        width: '100%',
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '1.5rem',
              color: '#1976d2',
              cursor: 'pointer'
            }} onClick={() => navigate('/')}>
              Internship Tracker
            </h1>
            <nav style={{
              display: 'flex',
              gap: '1.5rem'
            }}>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: isActive('/dashboard') ? '#1976d2' : '#666',
                  fontWeight: isActive('/dashboard') ? '600' : '400',
                  fontSize: '1rem'
                }}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/internships')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: isActive('/internships') ? '#1976d2' : '#666',
                  fontWeight: isActive('/internships') ? '600' : '400',
                  fontSize: '1rem'
                }}
              >
                Internships
              </button>
              <button
                onClick={() => navigate('/applications')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: isActive('/applications') ? '#1976d2' : '#666',
                  fontWeight: isActive('/applications') ? '600' : '400',
                  fontSize: '1rem'
                }}
              >
                Applications
              </button>
              <button
                onClick={() => navigate('/profile')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: isActive('/profile') ? '#1976d2' : '#666',
                  fontWeight: isActive('/profile') ? '600' : '400',
                  fontSize: '1rem'
                }}
              >
                Profile
              </button>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: '#f5f5f5',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#666',
              fontSize: '1rem',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#e0e0e0'}
            onMouseOut={(e) => e.target.style.background = '#f5f5f5'}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
        boxSizing: 'border-box'
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout; 