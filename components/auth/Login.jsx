import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockStudents } from '../../services/mockData';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the email exists in our mock data
    const student = mockStudents[credentials.email];
    
    if (student && student.password === credentials.password) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({ 
        email: credentials.email,
        role: 'student',
        id: student.id
      }));
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          color: '#333',
          fontSize: '28px',
          fontWeight: '600',
          width: '100%'
        }}>
          Student Login
        </h2>
        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '14px',
            width: '100%',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '1.5rem', width: '100%' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.75rem', 
              color: '#555',
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'left'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '2rem', width: '100%' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.75rem', 
              color: '#555',
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'left'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#1565c0'}
            onMouseOut={(e) => e.target.style.background = '#1976d2'}
          >
            Login
          </button>
        </form>
        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center', 
          color: '#666',
          fontSize: '14px',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          width: '100%'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>Demo credentials:</p>
          <p style={{ margin: '0 0 0.25rem 0' }}>Email: john.doe@student.com</p>
          <p style={{ margin: '0' }}>Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;