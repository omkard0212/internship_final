// src/components/internships/InternshipList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockInternships } from '../../services/mockData';

const InternshipList = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    department: '',
    sdg: '',
    po: '',
    peo: ''
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleApply = (internshipId) => {
    // Mock application submission - replace with API call later
    console.log(`Applying for internship ${internshipId}`);
    navigate('/application-tracker');
  };

  const filteredInternships = mockInternships.filter(internship => {
    return (
      (!filters.department || internship.department === filters.department) &&
      (!filters.sdg || internship.sdgs.includes(filters.sdg)) &&
      (!filters.po || internship.pos.includes(filters.po)) &&
      (!filters.peo || internship.peos.includes(filters.peo))
    );
  });

  // Get unique departments for filter dropdown
  const departments = [...new Set(mockInternships.map(internship => internship.department))];
  
  // Get unique SDGs for filter dropdown
  const sdgs = [...new Set(mockInternships.flatMap(internship => internship.sdgs))];
  
  // Get unique POs for filter dropdown
  const pos = [...new Set(mockInternships.flatMap(internship => internship.pos))];
  
  // Get unique PEOs for filter dropdown
  const peos = [...new Set(mockInternships.flatMap(internship => internship.peos))];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      padding: '2rem',
      background: '#f5f5f5',
      margin: 0,
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '2rem',
          fontSize: '32px',
          fontWeight: '600'
        }}>
          Available Internships
        </h1>

        {/* Filters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              width: '100%',
              fontSize: '14px',
              color: '#333',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            name="sdg"
            value={filters.sdg}
            onChange={handleFilterChange}
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              width: '100%',
              fontSize: '14px',
              color: '#333',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="">All SDGs</option>
            {sdgs.map(sdg => (
              <option key={sdg} value={sdg}>{sdg}</option>
            ))}
          </select>

          <select
            name="po"
            value={filters.po}
            onChange={handleFilterChange}
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              width: '100%',
              fontSize: '14px',
              color: '#333',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="">All POs</option>
            {pos.map(po => (
              <option key={po} value={po}>{po}</option>
            ))}
          </select>

          <select
            name="peo"
            value={filters.peo}
            onChange={handleFilterChange}
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              width: '100%',
              fontSize: '14px',
              color: '#333',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="">All PEOs</option>
            {peos.map(peo => (
              <option key={peo} value={peo}>{peo}</option>
            ))}
          </select>
        </div>

        {/* Internship List */}
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))'
        }}>
          {filteredInternships.length > 0 ? (
            filteredInternships.map(internship => (
              <div key={internship.id} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h2 style={{ 
                      color: '#333', 
                      margin: '0 0 0.5rem 0',
                      fontSize: '20px',
                      fontWeight: '600'
                    }}>
                      {internship.position}
                    </h2>
                    <h3 style={{ 
                      color: '#666', 
                      margin: '0 0 1rem 0', 
                      fontWeight: 'normal',
                      fontSize: '16px'
                    }}>
                      {internship.company}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleApply(internship.id)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#1976d2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'background-color 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#1565c0'}
                    onMouseOut={(e) => e.target.style.background = '#1976d2'}
                  >
                    Apply Now
                  </button>
                </div>

                <p style={{ 
                  color: '#666', 
                  marginBottom: '1rem',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  flex: '1'
                }}>
                  {internship.description}
                </p>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                  gap: '1rem', 
                  marginBottom: '1rem' 
                }}>
                  <div>
                    <p style={{ 
                      color: '#666', 
                      margin: '0 0 0.25rem 0',
                      fontSize: '14px'
                    }}>
                      <strong style={{ color: '#333' }}>Department:</strong> {internship.department}
                    </p>
                    <p style={{ 
                      color: '#666', 
                      margin: '0 0 0.25rem 0',
                      fontSize: '14px'
                    }}>
                      <strong style={{ color: '#333' }}>Duration:</strong> {internship.duration}
                    </p>
                    <p style={{ 
                      color: '#666', 
                      margin: '0',
                      fontSize: '14px'
                    }}>
                      <strong style={{ color: '#333' }}>Deadline:</strong> {internship.deadline}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ 
                    color: '#333', 
                    margin: '0 0 0.5rem 0',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    Requirements:
                  </h4>
                  <ul style={{ 
                    margin: '0', 
                    paddingLeft: '1.5rem', 
                    color: '#666',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}>
                    {internship.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {internship.sdgs.map((sdg, index) => (
                    <span key={index} style={{
                      background: '#e8f5e9',
                      color: '#2e7d32',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {sdg}
                    </span>
                  ))}
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem'
                }}>
                  {internship.pos.map((po, index) => (
                    <span key={index} style={{
                      background: '#e3f2fd',
                      color: '#1976d2',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {po}
                    </span>
                  ))}
                  {internship.peos.map((peo, index) => (
                    <span key={index} style={{
                      background: '#fff3e0',
                      color: '#ed6c02',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {peo}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center',
              gridColumn: '1 / -1'
            }}>
              <p style={{ 
                color: '#666', 
                fontStyle: 'italic',
                fontSize: '16px',
                margin: 0
              }}>
                No internships match your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipList;