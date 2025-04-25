import React from 'react';
import { mockCompanies, mockDepartments, sdgList } from '../../services/api';

const InternshipFilter = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    onFilterChange({
      ...filters,
      [name]: value
    });
  };
  
  const handleReset = () => {
    onFilterChange({
      department: '',
      company: '',
      sdg: '',
      status: ''
    });
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: '0', marginBottom: '15px' }}>Filter Internships</h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '15px'
      }}>
        <div>
          <label
            htmlFor="department"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: '500'
            }}
          >
            Department
          </label>
          <select
            id="department"
            name="department"
            value={filters.department}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ced4da'
            }}
          >
            <option value="">All Departments</option>
            {mockDepartments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label
            htmlFor="company"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: '500'
            }}
          >
            Company
          </label>
          <select
            id="company"
            name="company"
            value={filters.company}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ced4da'
            }}
          >
            <option value="">All Companies</option>
            {mockCompanies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label
            htmlFor="sdg"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: '500'
            }}
          >
            SDG
          </label>
          <select
            id="sdg"
            name="sdg"
            value={filters.sdg}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ced4da'
            }}
          >
            <option value="">All SDGs</option>
            {sdgList.map(sdg => (
              <option key={sdg} value={sdg}>{sdg}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label
            htmlFor="status"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: '500'
            }}
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ced4da'
            }}
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="applied">Applied</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>
      
      <div style={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Reset Filters
        </button>
        <button
          onClick={() => onFilterChange({...filters})}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3a86ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default InternshipFilter;