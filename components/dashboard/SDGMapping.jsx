import React from 'react';
import { mockInternships, sdgList } from '../../services/api';

const SDGMapping = ({ applications }) => {
  // Map application internshipIds to full internship objects with SDG info
  const internshipsWithSdgs = applications.map(app => {
    const internship = mockInternships.find(i => i.id === app.internshipId);
    return {
      ...app,
      sdgs: internship ? internship.sdgs : []
    };
  });
  
  // Count SDG occurrences across all internships
  const sdgCounts = {};
  internshipsWithSdgs.forEach(internship => {
    if (internship.sdgs) {
      internship.sdgs.forEach(sdg => {
        sdgCounts[sdg] = (sdgCounts[sdg] || 0) + 1;
      });
    }
  });
  
  // Sort SDGs by count (highest first)
  const sortedSdgs = Object.entries(sdgCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5 SDGs

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: '0', marginBottom: '20px' }}>SDG Mapping</h3>
      
      {sortedSdgs.length > 0 ? (
        <div>
          <h4 style={{ marginBottom: '10px' }}>Top SDGs in Your Internships</h4>
          {sortedSdgs.map(([sdg, count]) => (
            <div key={sdg} style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <span>{sdg}</span>
              <span style={{
                backgroundColor: '#8338ec',
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
      ) : (
        <p>No SDG data available for your internships yet.</p>
      )}
      
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e8f4f8',
        borderRadius: '8px'
      }}>
        <h4 style={{ margin: '0 0 10px' }}>Why SDGs Matter</h4>
        <p style={{ margin: '0', fontSize: '14px' }}>
          Sustainable Development Goals (SDGs) provide a blueprint for achieving a better and more sustainable future. 
          Internships aligned with SDGs help you contribute to global sustainability while building relevant skills.
        </p>
      </div>
    </div>
  );
};

export default SDGMapping;