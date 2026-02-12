
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SeminarLeaderForm from './components/SeminarLeaderForm';
import AdminDashboard from './components/AdminDashboard';
import LoginView from './components/LoginView';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Synchronize state with authentication service on mount
  useEffect(() => {
    setIsAdmin(authService.isAuthenticated());
  }, []);

  // Handle role toggle action from Layout component
  const handleToggleRole = () => {
    if (isAdmin) {
      authService.logout();
      setIsAdmin(false);
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setShowLogin(false);
  };

  const handleLoginCancel = () => {
    setShowLogin(false);
  };

  return (
    <Layout 
      title={isAdmin ? "Küchen-Monitor" : "Menü-Auswahl"} 
      isAdmin={isAdmin} 
      onToggleRole={handleToggleRole}
    >
      {/* Conditionally render the correct view based on auth state */}
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <SeminarLeaderForm />
      )}
      
      {/* Admin Login Modal Overlay */}
      {showLogin && (
        <LoginView 
          onLoginSuccess={handleLoginSuccess} 
          onCancel={handleLoginCancel} 
        />
      )}
    </Layout>
  );
};

export default App;
