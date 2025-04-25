import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { mockApplications, mockInternships, sdgList } from '../../services/api';

const ReportsAnalytics = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedReport, setSelectedReport] = useState('sdg');
  
  // Filter applications for the current user
  const userApplications = mockApplications.filter(app => app.studentId === currentUser.id);
  
  // Get full internship details for user applications
  const internshipsWithDetails = userApplications.map(app => {
    const internship = mockInternships.find(i => i.id === app.internshipId);
    return {
      ...app,
      internshipDetails: internship || {}
    };
  });

  // Calculate SDG distribution
  const sdgDistribution = {};
  internshipsWithDetails.forEach(app => {
    if (app.internshipDetails.sdgs) {
      app.internshipDetails.sdgs.forEach(sdg => {
        sdgDistribution[sdg] = (sdgDistribution[sdg] || 0) + 1;
      });
    }
  });
  
  // Calculate skills acquired
  const skillsAcquired = {};
  internshipsWithDetails.forEach(app => {
    if (app.internshipDetails.skills) {
      app.internshipDetails.skills.forEach(skill => {
        skillsAcquired[skill] = (skillsAcquired[skill] || 0) + 1;
      });
    }
  });
  
  // Calculate status distribution
  const statusDistribution = {};
  userApplications.forEach(app => {
    statusDistribution[app.status] = (statusDistribution[app.status] || 0) + 1;
  });
  
  // Skills growth over time
  const skillsGrowth = [
    { month: 'Jan', skills: 2 },
    { month: 'Feb', skills: 3 },
    { month: 'Mar', skills: 5 },
    { month: 'Apr', skills: 6 },
    { month: 'May', skills: 8 },
    { month: 'Jun', skills: 10 }
  ];

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{
        color: '#212529',
        marginBottom: '20px'
      }}>
        Reports & Analytics
      </h2>
      
      <div style={{
        display: 'flex',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setSelectedReport('sdg')}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedReport === 'sdg' ? '#3a86ff' : '#f8f9fa',
            color: selectedReport === 'sdg' ? 'white' : '#495057',
            border: '1px solid #ced4da',
            borderRadius: '4px 0 0 4px',
            cursor: 'pointer'
          }}
        >
          SDG Contributions
        </button>
        <button
          onClick={() => setSelectedReport('skills')}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedReport === 'skills' ? '#3a86ff' : '#f8f9fa',
            color: selectedReport === 'skills' ? 'white' : '#495057',
            border: '1px solid #ced4da',
            borderLeft: 'none',
            cursor: 'pointer'
          }}
        >
          Skills Acquired
        </button>
        <button
          onClick={() => setSelectedReport('status')}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedReport === 'status' ? '#3a86ff' : '#f8f9fa',
            color: selectedReport === 'status' ? 'white' : '#495057',
            border: '1px solid #ced4da',
            borderLeft: 'none',
            cursor: 'pointer'
          }}
        >
          Application Status
        </button>
        <button
          onClick={() => setSelectedReport('growth')}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedReport === 'growth' ? '#3a86ff' : '#f8f9fa',
            color: selectedReport === 'growth' ? 'white' : '#495057',
            border: '1px solid #ced4da',
            borderLeft: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer'
          }}
        >
          Growth Over Time
        </button>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {selectedReport === 'sdg' && (
          <div>
            <h3 style={{ marginTop: '0', marginBottom: '20px' }}>SDG Contributions</h3>
            
            {Object.keys(sdgDistribution).length > 0 ? (
              <div>
                {Object.entries(sdgDistribution).map(([sdg, count]) => (
                  <div key={sdg} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <div style={{ flex: '1' }}>
                      <p style={{ margin: '0 0 5px', fontWeight: '500' }}>{sdg}</p>
                      <div style={{
                        width: '100%',
                        height: '10px',
                        backgroundColor: '#e9ecef',
                        borderRadius: '5px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(count / userApplications.length) * 100}%`,
                          height: '100%',
                          backgroundColor: '#8338ec'
                        }}></div>
                      </div>
                    </div>
                    <div style={{ marginLeft: '15px' }}>
                      <span style={{
                        backgroundColor: '#8338ec',
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No SDG data available for your internships yet.</p>
            )}
          </div>
        )}
        
        {selectedReport === 'skills' && (
          <div>
            <h3 style={{ marginTop: '0', marginBottom: '20px' }}>Skills Acquired</h3>
            
            {Object.keys(skillsAcquired).length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '15px'
              }}>
                {Object.entries(skillsAcquired).map(([skill, count]) => (
                  <div key={skill} style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>{skill}</span>
                    <span style={{
                      backgroundColor: '#3a86ff',
                      color: 'white',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No skills data available for your internships yet.</p>
            )}
          </div>
        )}
        
        {selectedReport === 'status' && (
          <div>
            <h3 style={{ marginTop: '0', marginBottom: '20px' }}>Application Status</h3>
            
            {Object.keys(statusDistribution).length > 0 ? (
              <div>
                {Object.entries(statusDistribution).map(([status, count]) => {
                  // Define colors for different statuses
                  const statusColors = {
                    'Pending': '#ffc107',
                    'Approved': '#28a745',
                    'Rejected': '#dc3545',
                    'Completed': '#17a2b8'
                  };
                  
                  const statusColor = statusColors[status] || '#6c757d';
                  
                  return (
                    <div key={status} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '15px'
                    }}>
                      <div style={{ flex: '1' }}>
                        <p style={{ margin: '0 0 5px', fontWeight: '500' }}>{status}</p>
                        <div style={{
                          width: '100%',
                          height: '10px',
                          backgroundColor: '#e9ecef',
                          borderRadius: '5px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${(count / userApplications.length) * 100}%`,
                            height: '100%',
                            backgroundColor: statusColor
                          }}></div>
                        </div>
                      </div>
                      <div style={{ marginLeft: '15px' }}>
                        <span style={{
                          backgroundColor: statusColor,
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}>
                          {count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No application status data available yet.</p>
            )}
          </div>
        )}
        
        {selectedReport === 'growth' && (
          <div>
            <h3 style={{ marginTop: '0', marginBottom: '20px' }}>Skills Growth Over Time</h3>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ width: '600px', height: '300px', position: 'relative' }}>
                {/* Simple graph illustration */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  height: '250px',
                  width: '100%',
                  position: 'relative',
                  borderBottom: '2px solid #dee2e6',
                  borderLeft: '2px solid #dee2e6',
                  paddingLeft: '20px'
                }}>
                  {skillsGrowth.map((month, index) => (
                    <div key={month.month} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end',
                      flex: '1'
                    }}>
                      <div style={{
                        height: `${month.skills * 25}px`,
                        width: '40px',
                        backgroundColor: '#3a86ff',
                        borderRadius: '4px 4px 0 0'
                      }}></div>
                      <div style={{ marginTop: '10px' }}>{month.month}</div>
                    </div>
                  ))}
                </div>
                {/* Y-axis labels */}
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <span>10</span>
                  <span>8</span>
                  <span>6</span>
                  <span>4</span>
                  <span>2</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            
            <div style={{
              marginTop: '30px',
              padding: '15px',
              backgroundColor: '#e8f4f8',
              borderRadius: '8px'
            }}>
              <h4 style={{ margin: '0 0 10px' }}>Skills Development Analysis</h4>
              <p style={{ margin: '0', fontSize: '14px' }}>
                Your skill growth has been steady over the past 6 months. You've acquired 8 new 
                skills through your internships, with the most significant growth occurring between 
                March and May. Keep up the good work!
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div style={{
        marginTop: '30px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '15px' }}>Generate Report</h3>
        <p>Export your internship analytics data as a PDF or Excel file:</p>
        
        <div style={{
          marginTop: '15px',
          display: 'flex',
          gap: '10px'
        }}>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ marginRight: '5px' }}>PDF</span>
          </button>
          
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ marginRight: '5px' }}>Excel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;