import React, { useState } from 'react';

const InternshipCard = ({ internship, currentUser }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  const handleApply = () => {
    setIsApplying(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsApplying(false);
      setApplicationSubmitted(true);
      
      // Reset message after 3 seconds
      setTimeout(() => {
        setApplicationSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '10px'
        }}>
          <h3 style={{ margin: '0', color: '#3a86ff' }}>
            {internship.title}
          </h3>
          <span style={{
            backgroundColor: '#e9ecef',
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#495057'
          }}>
            {internship.department}
          </span>
        </div>
        
        <p style={{ margin: '0', color: '#6c757d' }}>
          {internship.company}
        </p>
      </div>
      
      <div style={{ padding: '20px' }}>
        <div style={{
          marginBottom: '15px'
        }}>
          <p style={{ margin: '0 0 5px', fontWeight: '600' }}>Description:</p>
          <p style={{ margin: '0', fontSize: '14px' }}>
            {internship.description}
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px'
        }}>
          <div>
            <p style={{ margin: '0 0 5px', fontWeight: '600' }}>Duration:</p>
            <p style={{ margin: '0', fontSize: '14px' }}>
              {internship.duration}
            </p>
          </div>
          <div>
            <p style={{ margin: '0 0 5px', fontWeight: '600' }}>Stipend:</p>
            <p style={{ margin: '0', fontSize: '14px' }}>
              {internship.stipend}
            </p>
          </div>
          <div>
            <p style={{ margin: '0 0 5px', fontWeight: '600' }}>Deadline:</p>
            <p style={{ margin: '0', fontSize: '14px' }}>
              {internship.deadline}
            </p>
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ margin: '0 0 8px', fontWeight: '600' }}>SDGs:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {internship.sdgs && internship.sdgs.map(sdg => (
              <span key={sdg} style={{
                backgroundColor: '#8338ec',
                color: 'white',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                {sdg}
              </span>
            ))}
          </div>
        </div>
        
        {applicationSubmitted ? (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '10px',
            borderRadius: '4px',
            textAlign: 'center',
            marginBottom: '15px'
          }}>
            Application submitted successfully!
          </div>
        ) : null}
        
        <button
          onClick={handleApply}
          disabled={isApplying}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3a86ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isApplying ? 'not-allowed' : 'pointer',
            opacity: isApplying ? 0.7 : 1,
            fontWeight: '500'
          }}
        >
          {isApplying ? 'Submitting Application...' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;