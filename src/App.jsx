import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import PatientDashboard from './pages/Dashboard/PatientDashboard';
import DoctorDashboard from './pages/Dashboard/DoctorDashboard';
import Navbar from './components/layout/Navbar';

// Placeholder Home/Patient Dashboard
const Home = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  if (user.role === 'admin') return <Navigate to="/admin" />;
  if (user.role === 'patient') return <PatientDashboard />;
  if (user.role === 'doctor') return <DoctorDashboard />;

  // Default fallback for doctor or other roles if not yet implemented
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700 }}>Welcome, {user.name}</h1>
        <p style={{ marginTop: '16px' }}>Dashboard for {user.role} is under construction.</p>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div>Access Denied. You do not have permission to view this page.</div>;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<Home />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
