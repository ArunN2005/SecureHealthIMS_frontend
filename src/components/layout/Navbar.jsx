import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';
import { Moon, Sun, LogOut, User, LayoutDashboard, Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      height: '64px',
      backgroundColor: 'var(--glass-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: 'var(--glass-border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Stethoscope size={24} color="var(--accent)" />
        <Link to="/" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>
          MediCare
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={toggleTheme}
          style={{ background: 'none', border: 'none', color: 'var(--text-primary)', padding: '8px' }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user ? (
          <>
            {/* Show Dashboard link if admin */}
            {user.role === 'admin' && (
              <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <User size={18} />
              <span>{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px'
              }}
            >
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <Link to="/login" style={{
            padding: '8px 16px',
            backgroundColor: 'var(--accent)',
            color: 'white',
            borderRadius: 'var(--radius-lg)',
            fontSize: '14px',
            fontWeight: 500
          }}>
            Login
          </Link>
        )}
      </div>
    </nav >
  );
};

export default Navbar;
