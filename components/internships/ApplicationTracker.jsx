import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockStudents, mockInternships } from '../../services/mockData';

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    const student = mockStudents[user.email];
    if (student) {
      // Combine all internship applications
      const allApplications = [
        ...student.internships.completed.map(internship => ({
          ...internship,
          status: 'Completed'
        })),
        ...student.internships.ongoing.map(internship => ({
          ...internship,
          status: 'Ongoing'
        })),
        ...student.internships.applied
      ];
      setApplications(allApplications);
    }
  }, [navigate]);

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#2e7d32';
      case 'ongoing':
        return '#1976d2';
      case 'pending':
        return '#ed6c02';
      case 'under review':
        return '#9c27b0';
      case 'accepted':
        return '#2e7d32';
      case 'rejected':
        return '#d32f2f';
      default:
        return '#666';
    }
  };

  return (
    <>
      <div style={{
        marginBottom: '2rem',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#333',
          marginBottom: '1.5rem',
          fontSize: '32px',
          fontWeight: '600'
        }}>
          My Applications
        </h1>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {['All', 'Pending', 'Ongoing', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status.toLowerCase())}
              style={{
                padding: '0.5rem 1.5rem',
                background: filter === status.toLowerCase() ? '#1976d2' : 'white',
                color: filter === status.toLowerCase() ? 'white' : '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: filter === status.toLowerCase() ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        width: '100%'
      }}>
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <div
              key={application.id}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div>
                <h3 style={{
                  margin: '0 0 0.5rem 0',
                  color: '#333',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  {application.position}
                </h3>
                <p style={{
                  margin: '0',
                  color: '#666',
                  fontSize: '14px'
                }}>
                  {application.company}
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{
                  background: `${getStatusColor(application.status)}20`,
                  color: getStatusColor(application.status),
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {application.status}
                </span>
              </div>

              {(application.startDate && application.endDate) && (
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <p style={{ margin: '0 0 0.25rem 0' }}>
                    Duration: {application.duration}
                  </p>
                  <p style={{ margin: '0' }}>
                    Period: {application.startDate} - {application.endDate}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '2rem',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <p style={{
              color: '#666',
              fontSize: '16px',
              margin: '0 0 1rem 0'
            }}>
              No applications found for the selected filter.
            </p>
            <button
              onClick={() => navigate('/internships')}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.background = '#1565c0'}
              onMouseOut={(e) => e.target.style.background = '#1976d2'}
            >
              Browse Available Internships
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationTracker;