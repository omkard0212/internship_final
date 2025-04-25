import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockStudents } from '../../services/mockData';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
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
      setEditedData(student);
    }
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(studentData);
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the profile
    setStudentData(editedData);
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value
    });
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#333', marginBottom: '2rem' }}>Student Profile</h1>

      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {isEditing ? (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                disabled
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
                Department
              </label>
              <select
                name="department"
                value={editedData.department}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Chemical">Chemical</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
                Year
              </label>
              <select
                name="year"
                value={editedData.year}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
                GPA
              </label>
              <input
                type="number"
                name="gpa"
                value={editedData.gpa}
                onChange={handleChange}
                step="0.01"
                min="0"
                max="4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
                Skills (comma separated)
              </label>
              <input
                type="text"
                name="skills"
                value={editedData.skills.join(', ')}
                onChange={(e) => {
                  setEditedData({
                    ...editedData,
                    skills: e.target.value.split(',').map(skill => skill.trim())
                  });
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCancel}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: '#666',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#f5f5f5';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#1565c0'}
                onMouseOut={(e) => e.target.style.background = '#1976d2'}
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: '#333', margin: '0' }}>{studentData.name}</h2>
              <button
                onClick={handleEdit}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#1565c0'}
                onMouseOut={(e) => e.target.style.background = '#1976d2'}
              >
                Edit Profile
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#333' }}>Email:</strong> {studentData.email}
                </p>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#333' }}>Department:</strong> {studentData.department}
                </p>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#333' }}>Year:</strong> {studentData.year}
                </p>
              </div>
              <div>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#333' }}>Student ID:</strong> {studentData.id}
                </p>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#333' }}>GPA:</strong> {studentData.gpa}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {studentData.skills.map((skill, index) => (
                  <span key={index} style={{
                    background: '#e3f2fd',
                    color: '#1976d2',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>Internship Statistics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={{
                  background: '#e8f5e9',
                  padding: '1rem',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#2e7d32', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                    {studentData.internships.completed.length}
                  </p>
                  <p style={{ color: '#2e7d32', margin: '0' }}>Completed</p>
                </div>
                <div style={{
                  background: '#e3f2fd',
                  padding: '1rem',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#1976d2', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                    {studentData.internships.ongoing.length}
                  </p>
                  <p style={{ color: '#1976d2', margin: '0' }}>Ongoing</p>
                </div>
                <div style={{
                  background: '#fff3e0',
                  padding: '1rem',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#ed6c02', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                    {studentData.internships.applied.length}
                  </p>
                  <p style={{ color: '#ed6c02', margin: '0' }}>Applied</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile; 