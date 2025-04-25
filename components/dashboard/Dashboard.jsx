// Continuing from where we left off

// src/components/dashboard/Dashboard.jsx (continuation)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockStudents, mockInternships } from '../../services/mockData';

const Dashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [recommendedInternships, setRecommendedInternships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    // Get student data from mock data
    const student = mockStudents[user.email];
    if (student) {
      setStudentData(student);
  
      // Find recommended internships based on student's department and skills
      const recommended = mockInternships
        .filter(internship => 
          internship.department === student.department &&
          !student.internships.completed.some(comp => comp.id === internship.id) &&
          !student.internships.ongoing.some(ongo => ongo.id === internship.id) &&
          !student.internships.applied.some(app => app.id === internship.id)
        )
        .slice(0, 3);
      
      setRecommendedInternships(recommended);
    }
  }, [navigate]);

  if (!studentData) {
    return <p>Loading...</p>;
  }

  // Calculate application progress
  const totalApplications = studentData.internships.applied.length;
  const acceptedApplications = studentData.internships.applied.filter(app => app.status === 'Accepted').length;
  const progressPercentage = totalApplications > 0 ? (acceptedApplications / totalApplications) * 100 : 0;

  // Get upcoming deadlines
  const upcomingDeadlines = mockInternships
    .filter(internship => 
      new Date(internship.deadline) > new Date() &&
      !studentData.internships.applied.some(app => app.id === internship.id)
    )
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  return (
    <>
      {/* Welcome Section */}
      <div style={{
        marginBottom: '2rem',
        width: '100%',
        textAlign: 'center',
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '0.5rem',
          fontSize: '32px',
          fontWeight: '600'
        }}>
          Welcome, {studentData.name}
        </h1>
        <p style={{ 
          color: '#666',
          fontSize: '16px',
          margin: '0 0 1rem 0'
        }}>
          {studentData.department} - {studentData.year}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ 
              color: '#1976d2',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0'
            }}>
              {studentData.gpa}
            </p>
            <p style={{ 
              color: '#666',
              fontSize: '14px',
              margin: '0'
            }}>
              GPA
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ 
              color: '#2e7d32',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0'
            }}>
              {studentData.internships.completed.length}
            </p>
            <p style={{ 
              color: '#666',
              fontSize: '14px',
              margin: '0'
            }}>
              Completed
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ 
              color: '#ed6c02',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0'
            }}>
              {studentData.internships.applied.length}
            </p>
            <p style={{ 
              color: '#666',
              fontSize: '14px',
              margin: '0'
            }}>
              Applied
            </p>
          </div>
        </div>
      </div>
      
      {/* Progress Summary */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        width: '100%'
      }}>
        <h2 style={{ 
          color: '#333', 
          marginBottom: '1rem',
          fontSize: '20px',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Application Progress
        </h2>
        <div style={{
          width: '100%',
          height: '20px',
          background: '#e0e0e0',
          borderRadius: '10px',
          marginBottom: '1rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercentage}%`,
            height: '100%',
            background: '#1976d2',
            borderRadius: '10px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#666',
          fontSize: '14px'
        }}>
          <span>Applications: {totalApplications}</span>
          <span>Accepted: {acceptedApplications}</span>
          <span>Success Rate: {progressPercentage.toFixed(1)}%</span>
        </div>
      </div>
      
      {/* Upcoming Deadlines */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        width: '100%'
      }}>
        <h2 style={{ 
          color: '#333', 
          marginBottom: '1rem',
          fontSize: '20px',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Upcoming Deadlines
        </h2>
        {upcomingDeadlines.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {upcomingDeadlines.map(internship => (
              <div key={internship.id} style={{
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                background: '#f8f9fa'
              }}>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#333',
                  fontSize: '16px',
                  fontWeight: '500'
                }}>
                  {internship.position}
                </h3>
                <p style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#666',
                  fontSize: '14px'
                }}>
                  {internship.company}
                </p>
                <p style={{ 
                  margin: '0', 
                  color: '#d32f2f',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Deadline: {new Date(internship.deadline).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ 
            color: '#666', 
            fontStyle: 'italic',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            No upcoming deadlines.
          </p>
        )}
      </div>
      
      {/* Recommended Internships */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        width: '100%'
      }}>
        <h2 style={{ 
          color: '#333', 
          marginBottom: '1rem',
          fontSize: '20px',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Recommended for You
        </h2>
        {recommendedInternships.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {recommendedInternships.map(internship => (
              <div key={internship.id} style={{
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                background: '#f8f9fa'
              }}>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#333',
                  fontSize: '16px',
                  fontWeight: '500'
                }}>
                  {internship.position}
                </h3>
                <p style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#666',
                  fontSize: '14px'
                }}>
                  {internship.company}
                </p>
                <p style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#666',
                  fontSize: '14px'
                }}>
                  Duration: {internship.duration}
                </p>
                <button
                  onClick={() => navigate('/internships')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    width: '100%',
                    marginTop: '0.5rem'
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ 
            color: '#666', 
            fontStyle: 'italic',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            No recommendations available.
          </p>
        )}
      </div>

      {/* Internship Sections */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem',
        width: '100%'
      }}>
        {/* Completed Internships */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{ 
            color: '#2e7d32', 
            marginBottom: '1rem',
            fontSize: '20px',
            fontWeight: '600',
            width: '100%',
            textAlign: 'center'
          }}>
            Completed Internships
          </h2>
          {studentData.internships.completed.length > 0 ? (
            studentData.internships.completed.map(internship => (
              <div key={internship.id} style={{
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                marginBottom: '1rem',
                background: '#f8f9fa',
                width: '100%'
              }}>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#333',
                  fontSize: '16px',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  {internship.position}
                </h3>
                <p style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#666',
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  {internship.company}
                </p>
                <p style={{ 
                  margin: '0', 
                  color: '#666',
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  Duration: {internship.duration}
                </p>
                <p style={{ 
                  margin: '0.5rem 0 0 0', 
                  color: '#666',
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  {internship.startDate} - {internship.endDate}
                </p>
              </div>
            ))
          ) : (
            <p style={{ 
              color: '#666', 
              fontStyle: 'italic',
              fontSize: '14px',
              textAlign: 'center',
              width: '100%'
            }}>
              No completed internships yet.
            </p>
          )}
        </div>
        
        {/* Ongoing Internships */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{ 
            color: '#1976d2', 
            marginBottom: '1rem',
            fontSize: '20px',
            fontWeight: '600',
            width: '100%',
            textAlign: 'center'
          }}>
            Ongoing Internships
          </h2>
          {studentData.internships.ongoing.length > 0 ? (
            studentData.internships.ongoing.map(internship => (
              <div key={internship.id} style={{
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                marginBottom: '1rem',
                background: '#f8f9fa',
                width: '100%'
              }}>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#333',
                  fontSize: '16px',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  {internship.position}
                </h3>
                <p style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#666',
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  {internship.company}
                </p>
                <p style={{ 
                  margin: '0', 
                  color: '#666',
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  Duration: {internship.duration}
                </p>
                <p style={{ 
                  margin: '0.5rem 0 0 0', 
                  color: '#666',
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  {internship.startDate} - {internship.endDate}
                </p>
              </div>
            ))
          ) : (
            <p style={{ 
              color: '#666', 
              fontStyle: 'italic',
              fontSize: '14px',
              textAlign: 'center',
              width: '100%'
            }}>
              No ongoing internships.
            </p>
          )}
        </div>
        
        {/* Applied Internships */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{ 
            color: '#ed6c02', 
            marginBottom: '1rem',
            fontSize: '20px',
            fontWeight: '600',
            width: '100%',
            textAlign: 'center'
          }}>
            Applied Internships
          </h2>
          {studentData.internships.applied.length > 0 ? (
            studentData.internships.applied.map(internship => (
              <div key={internship.id} style={{
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                marginBottom: '1rem',
                background: '#f8f9fa',
                width: '100%'
              }}>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#333',
                  fontSize: '16px',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  {internship.position}
                </h3>
                <p style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#666',
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  {internship.company}
                </p>
                <p style={{ 
                  margin: '0', 
                  color: '#666',
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  Status: {internship.status}
                </p>
              </div>
            ))
          ) : (
            <p style={{ 
              color: '#666', 
              fontStyle: 'italic',
              fontSize: '14px',
              textAlign: 'center',
              width: '100%'
            }}>
              No applied internships yet.
            </p>
          )}
        </div>
      </div>
      
      {/* Skills Section */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        width: '100%'
      }}>
        <h2 style={{ 
          color: '#333', 
          marginBottom: '1rem',
          fontSize: '20px',
          fontWeight: '600',
          width: '100%',
          textAlign: 'center'
        }}>
          Skills
        </h2>
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap', 
          gap: '0.5rem',
          justifyContent: 'center',
          width: '100%'
        }}>
          {studentData.skills.map((skill, index) => (
            <span key={index} style={{
              background: '#e3f2fd',
              color: '#1976d2',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Browse Button */}
      <div style={{ 
        marginTop: '2rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => navigate('/internships')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#1565c0'}
          onMouseOut={(e) => e.target.style.background = '#1976d2'}
        >
          Browse Available Internships
        </button>
      </div>
    </>
  );
};

export default Dashboard;