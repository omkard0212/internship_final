// src/components/dashboard/InternshipStats.jsx
import React from 'react';

const InternshipStats = ({ applications }) => {
  // Count internships by company
  const companyCount = applications.reduce((acc, app) => {
    acc[app.company] = (acc[app.company] || 0) + 1;
    return acc;
  }, {});

  // Get status distribution
  const statusCount = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: '0', marginBottom: '20px' }}>Internship Statistics</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ marginBottom: '10px' }}>Applications by Company</h4>
        {Object.entries(companyCount).map(([company, count]) => (
          <div key={company} style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}>
            <span>{company}</span>
            <span style={{
              backgroundColor: '#3a86ff',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {count}
            </span>
          </div>
        ))}
      </div>
      
      <div>
        <h4 style={{ marginBottom: '10px' }}>Status Distribution</h4>
        {Object.entries(statusCount).map(([status, count]) => {
          // Define colors for different statuses
          const statusColors = {
            'Pending': '#ffc107',
            'Approved': '#28a745',
            'Rejected': '#dc3545',
            'Completed': '#17a2b8'
          };
          
          const color = statusColors[status] || '#6c757d';
          
          return (
            <div key={status} style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <span>{status}</span>
              <span style={{
                backgroundColor: color,
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InternshipStats;