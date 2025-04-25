import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import InternshipList from '../components/internships/InternshipList';

const InternshipListPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa'
    }}>
      <Header />
      
      <div style={{
        display: 'flex',
        flex: '1',
        marginTop: '64px' // Header height
      }}>
        <Sidebar />
        
        <main style={{
          marginLeft: '250px', // Sidebar width
          width: 'calc(100% - 250px)',
          padding: '20px'
        }}>
          <InternshipList />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default InternshipListPage;