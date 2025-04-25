import React from 'react';

const InternshipProgress = ({ internship }) => {
  return (
    <div style={{
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <div>
          <h4 style={{ margin: '0 0 5px' }}>{internship.internshipTitle}</h4>
          <p style={{ margin: '0', color: '#6c757d' }}>{internship.company}</p>
        </div>
        <div>
          <span style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {internship.status}
          </span>
        </div>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <p style={{ margin: '0 0 5px' }}>
          <strong>Faculty Mentor:</strong> {internship.mentorName || 'Not Assigned'}
        </p>
        <p style={{ margin: '0' }}>
          <strong>Applied on:</strong> {internship.appliedDate}
        </p>
      </div>
      
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '5px'
        }}>
          <span>Progress</span>
          <span>{internship.progress}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#e9ecef',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${internship.progress}%`,
            height: '100%',
            backgroundColor: '#3a86ff'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default InternshipProgress;
