import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import Dashboard from '../components/dashboard/Dashboard';

const DashboardPage = () => {
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
          <Dashboard />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;