// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Additional validation based on user type
    if (userType === 'student' && !studentName) {
      setError('Please enter your name');
      return;
    }
    
    if (userType === 'university' && !universityName) {
      setError('Please enter university name');
      return;
    }
    
    if (userType === 'company' && !companyName) {
      setError('Please enter company name');
      return;
    }
    
    try {
      // This will be replaced with actual API call later
      console.log('Logging in as:', userType);
      console.log('Email:', email);
      
      // Log additional information based on user type
      if (userType === 'student') {
        console.log('Student Name:', studentName);
        console.log('University:', universityName);
      } else if (userType === 'university') {
        console.log('University Name:', universityName);
      } else if (userType === 'company') {
        console.log('Company Name:', companyName);
      }
      
      // Mock login for frontend development
      // Later we'll replace this with actual authentication
      if (email && password) {
        // Redirect based on user type
        switch(userType) {
          case 'student':
            navigate('/student-dashboard');
            break;
          case 'company':
            navigate('/company-dashboard');
            break;
          case 'university':
            navigate('/university-dashboard');
            break;
          default:
            navigate('/student-dashboard');
        }
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  // Inline styles object
  const styles = {
    loginContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    },
    formContainer: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '450px',
      padding: '30px'
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '25px',
      fontSize: '28px'
    },
    userTypeSelector: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '25px',
      gap: '10px'
    },
    typeButton: {
      padding: '10px 15px',
      border: '2px solid #ddd',
      backgroundColor: '#f9f9f9',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    activeButton: {
      backgroundColor: '#4a80e4',
      color: 'white',
      borderColor: '#4a80e4'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontWeight: '600',
      color: '#555'
    },
    input: {
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
      transition: 'border-color 0.3s'
    },
    loginButton: {
      backgroundColor: '#4a80e4',
      color: 'white',
      border: 'none',
      padding: '14px 20px',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px'
    },
    errorMessage: {
      color: '#e74c3c',
      backgroundColor: '#fadbd8',
      padding: '10px',
      borderRadius: '5px',
      textAlign: 'center'
    },
    formFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px'
    },
    link: {
      color: '#4a80e4',
      textDecoration: 'none',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Internship Portal</h1>
        <div style={styles.userTypeSelector}>
          <button 
            style={userType === 'student' ? {...styles.typeButton, ...styles.activeButton} : styles.typeButton} 
            onClick={() => setUserType('student')}
          >
            Student
          </button>
          <button 
            style={userType === 'company' ? {...styles.typeButton, ...styles.activeButton} : styles.typeButton}
            onClick={() => setUserType('company')}
          >
            Company
          </button>
          <button 
            style={userType === 'university' ? {...styles.typeButton, ...styles.activeButton} : styles.typeButton}
            onClick={() => setUserType('university')}
          >
            University
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorMessage}>{error}</div>}
          
          {/* User type specific fields */}
          {userType === 'student' && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="studentName">Full Name</label>
                <input
                  style={styles.input}
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="universityName">University</label>
                <input
                  style={styles.input}
                  type="text"
                  id="universityName"
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  placeholder="Enter your university"
                  required
                />
              </div>
            </>
          )}
          
          {userType === 'university' && (
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="universityName">University Name</label>
              <input
                style={styles.input}
                type="text"
                id="universityName"
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                placeholder="Enter university name"
                required
              />
            </div>
          )}
          
          {userType === 'company' && (
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="companyName">Company Name</label>
              <input
                style={styles.input}
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>
          )}
          
          {/* Common fields for all user types */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              style={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" style={styles.loginButton}>
            Log In as {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </button>
          
          <div style={styles.formFooter}>
            <a href="/forgot-password" style={styles.link}>Forgot Password?</a>
            <a href="/register" style={styles.link}>Create an Account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;